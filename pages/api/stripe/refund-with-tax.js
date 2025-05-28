// Stripe Refund with UAE VAT Handling - Nexus TechHub
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

// UAE VAT configuration
const UAE_VAT_CONFIG = {
  vatRate: 0.05, // 5% VAT
  currency: 'aed',
  country: 'AE',
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      chargeId, 
      amount, 
      reason = 'requested_by_customer',
      refundType = 'full', // 'full', 'partial', 'line_item'
      taxTransactionId,
      metadata = {}
    } = req.body;

    // Validate required fields
    if (!chargeId) {
      return res.status(400).json({ error: 'Charge ID is required' });
    }

    // Retrieve the original charge to get payment details
    const charge = await stripe.charges.retrieve(chargeId);
    
    if (!charge) {
      return res.status(404).json({ error: 'Charge not found' });
    }

    // Calculate refund amount
    let refundAmount = amount;
    if (refundType === 'full') {
      refundAmount = charge.amount;
    } else if (!amount) {
      return res.status(400).json({ error: 'Amount is required for partial refunds' });
    }

    // Validate refund amount
    if (refundAmount > charge.amount) {
      return res.status(400).json({ 
        error: 'Refund amount cannot exceed original charge amount' 
      });
    }

    // Calculate VAT portion of refund
    const originalAmountAED = charge.amount / 100;
    const refundAmountAED = refundAmount / 100;
    
    // Calculate VAT amounts (assuming tax-inclusive pricing)
    const originalVATAmount = originalAmountAED * UAE_VAT_CONFIG.vatRate / (1 + UAE_VAT_CONFIG.vatRate);
    const refundVATAmount = refundAmountAED * UAE_VAT_CONFIG.vatRate / (1 + UAE_VAT_CONFIG.vatRate);
    
    // Prepare refund metadata
    const refundMetadata = {
      ...metadata,
      nexus_refund: 'true',
      business_name: 'Nexus TechHub',
      original_charge_id: chargeId,
      refund_type: refundType,
      refund_amount_aed: refundAmountAED.toString(),
      refund_vat_amount: refundVATAmount.toFixed(2),
      original_vat_amount: originalVATAmount.toFixed(2),
      uae_vat_rate: UAE_VAT_CONFIG.vatRate.toString(),
      processed_at: new Date().toISOString(),
      location: 'Ras Al Khaimah, UAE'
    };

    // Add tax transaction ID if provided
    if (taxTransactionId) {
      refundMetadata.tax_transaction_id = taxTransactionId;
    }

    // Create the refund
    const refund = await stripe.refunds.create({
      charge: chargeId,
      amount: refundAmount,
      reason: reason,
      metadata: refundMetadata
    });

    // Handle tax transaction reversal if tax transaction ID is provided
    let taxReversal = null;
    if (taxTransactionId) {
      try {
        // Create tax transaction reversal
        taxReversal = await stripe.tax.transactions.createReversal(taxTransactionId, {
          reference: `NTH-REVERSAL-${Date.now()}`,
          metadata: {
            refund_id: refund.id,
            business_name: 'Nexus TechHub',
            reason: reason,
            refund_type: refundType
          }
        });

        console.log('Tax transaction reversal created:', taxReversal.id);
      } catch (taxError) {
        console.error('Tax reversal failed:', taxError);
        // Continue with refund even if tax reversal fails
        refundMetadata.tax_reversal_error = taxError.message;
      }
    }

    // Log successful refund
    console.log('Refund processed successfully:', {
      refundId: refund.id,
      chargeId: chargeId,
      amount: refundAmountAED,
      vatAmount: refundVATAmount,
      taxReversalId: taxReversal?.id
    });

    // Send notification (integrate with existing webhook system)
    await sendRefundNotification({
      refund,
      charge,
      taxReversal,
      vatAmount: refundVATAmount,
      originalVATAmount: originalVATAmount
    });

    // Prepare response
    const response = {
      refund: {
        id: refund.id,
        amount: refundAmountAED,
        currency: refund.currency.toUpperCase(),
        status: refund.status,
        reason: refund.reason,
        created: refund.created
      },
      vatDetails: {
        refundVATAmount: refundVATAmount,
        originalVATAmount: originalVATAmount,
        vatRate: UAE_VAT_CONFIG.vatRate,
        currency: 'AED'
      },
      taxReversal: taxReversal ? {
        id: taxReversal.id,
        status: 'created',
        reference: taxReversal.reference
      } : null,
      metadata: refundMetadata
    };

    res.status(200).json(response);

  } catch (error) {
    console.error('Refund processing error:', error);

    // Handle specific Stripe errors
    if (error.type === 'StripeCardError') {
      return res.status(400).json({ 
        error: 'Refund failed', 
        details: error.message 
      });
    }

    if (error.type === 'StripeInvalidRequestError') {
      return res.status(400).json({ 
        error: 'Invalid refund request', 
        details: error.message 
      });
    }

    if (error.code === 'charge_already_refunded') {
      return res.status(400).json({ 
        error: 'Charge has already been refunded', 
        details: error.message 
      });
    }

    if (error.code === 'amount_too_large') {
      return res.status(400).json({ 
        error: 'Refund amount exceeds available amount', 
        details: error.message 
      });
    }

    res.status(500).json({
      error: 'Refund processing failed',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
}

// Send refund notification
async function sendRefundNotification(data) {
  try {
    const { refund, charge, taxReversal, vatAmount, originalVATAmount } = data;

    const notificationData = {
      event_type: 'refund.processed',
      business: 'nexus-techhub',
      market: 'uae',
      timestamp: new Date().toISOString(),
      refund_id: refund.id,
      charge_id: charge.id,
      amount: refund.amount / 100,
      currency: refund.currency.toUpperCase(),
      vat_refunded: vatAmount,
      original_vat: originalVATAmount,
      tax_reversal_id: taxReversal?.id,
      customer_email: charge.billing_details?.email,
      reason: refund.reason
    };

    // Send to Slack webhook if configured
    if (process.env.SLACK_WEBHOOK_URL) {
      await fetch(process.env.SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `💰 Nexus TechHub Refund Processed`,
          attachments: [{
            color: 'warning',
            fields: [
              { title: 'Refund ID', value: refund.id, short: true },
              { title: 'Amount', value: `${refund.amount / 100} AED`, short: true },
              { title: 'VAT Refunded', value: `${vatAmount.toFixed(2)} AED`, short: true },
              { title: 'Reason', value: refund.reason, short: true }
            ]
          }]
        })
      }).catch(console.error);
    }

    // Send to Zapier webhook if configured
    if (process.env.ZAPIER_WEBHOOK_URL) {
      await fetch(process.env.ZAPIER_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notificationData)
      }).catch(console.error);
    }

    console.log('Refund notification sent successfully');
  } catch (error) {
    console.error('Failed to send refund notification:', error);
  }
}

// Helper function to calculate VAT breakdown
export function calculateVATBreakdown(totalAmount, vatRate = 0.05, taxInclusive = true) {
  if (taxInclusive) {
    // Amount includes VAT
    const baseAmount = totalAmount / (1 + vatRate);
    const vatAmount = totalAmount - baseAmount;
    return {
      baseAmount: Math.round(baseAmount * 100) / 100,
      vatAmount: Math.round(vatAmount * 100) / 100,
      totalAmount: totalAmount,
      vatRate: vatRate
    };
  } else {
    // Amount excludes VAT
    const vatAmount = totalAmount * vatRate;
    const totalWithVAT = totalAmount + vatAmount;
    return {
      baseAmount: totalAmount,
      vatAmount: Math.round(vatAmount * 100) / 100,
      totalAmount: Math.round(totalWithVAT * 100) / 100,
      vatRate: vatRate
    };
  }
}
