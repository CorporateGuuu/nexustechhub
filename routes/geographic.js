const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const { isAdmin } = require('../middleware/auth');

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString: 'postgresql://postgres:postgres@localhost:5432/phone_electronics_store',
  ssl: false,
});

// Middleware to check admin access
router.use(isAdmin);

// Estados management
router.get('/estados', async (req, res) => {
  try {
    const query = `
      SELECT e.*,
             (SELECT COUNT(*) FROM ciudades c WHERE c.estado_id = e.id) as ciudades_count
      FROM estados e
      ORDER BY e.name
    `;
    const result = await pool.query(query);

    res.render('geographic/estados', {
      title: 'Estados',
      estados: result.rows,
      path: '/geographic/estados'
    });
  } catch (error) {
    console.error('Error fetching estados:', error);
    res.status(500).send('Server error');
  }
});

router.get('/estados/add', async (req, res) => {
  res.render('geographic/estado-form', {
    title: 'Add Estado',
    estado: {},
    isNew: true,
    path: '/geographic/estados'
  });
});

router.get('/estados/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'SELECT * FROM estados WHERE id = $1';
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).render('404', { message: 'Estado not found' });
    }

    res.render('geographic/estado-form', {
      title: 'Edit Estado',
      estado: result.rows[0],
      isNew: false,
      path: '/geographic/estados'
    });
  } catch (error) {
    console.error('Error fetching estado:', error);
    res.status(500).send('Server error');
  }
});

router.post('/estados/save', async (req, res) => {
  try {
    const { id, name, code } = req.body;

    if (id) {
      await pool.query(
        'UPDATE estados SET name = $1, code = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3',
        [name, code, id]
      );
    } else {
      await pool.query(
        'INSERT INTO estados (name, code) VALUES ($1, $2)',
        [name, code]
      );
    }

    res.redirect('/geographic/estados');
  } catch (error) {
    console.error('Error saving estado:', error);
    res.status(500).send('Server error');
  }
});

router.post('/estados/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM estados WHERE id = $1', [id]);
    res.redirect('/geographic/estados');
  } catch (error) {
    console.error('Error deleting estado:', error);
    res.status(500).send('Server error');
  }
});

// Ciudades management
router.get('/ciudades', async (req, res) => {
  try {
    const query = `
      SELECT c.*, e.name as estado_name,
             (SELECT COUNT(*) FROM municipios m WHERE m.ciudad_id = c.id) as municipios_count
      FROM ciudades c
      LEFT JOIN estados e ON c.estado_id = e.id
      ORDER BY e.name, c.name
    `;
    const result = await pool.query(query);

    res.render('geographic/ciudades', {
      title: 'Ciudades',
      ciudades: result.rows,
      path: '/geographic/ciudades'
    });
  } catch (error) {
    console.error('Error fetching ciudades:', error);
    res.status(500).send('Server error');
  }
});

router.get('/ciudades/add', async (req, res) => {
  try {
    const estadosQuery = 'SELECT id, name FROM estados ORDER BY name';
    const estadosResult = await pool.query(estadosQuery);

    res.render('geographic/ciudad-form', {
      title: 'Add Ciudad',
      ciudad: {},
      estados: estadosResult.rows,
      isNew: true,
      path: '/geographic/ciudades'
    });
  } catch (error) {
    console.error('Error fetching estados:', error);
    res.status(500).send('Server error');
  }
});

router.get('/ciudades/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const ciudadQuery = 'SELECT * FROM ciudades WHERE id = $1';
    const ciudadResult = await pool.query(ciudadQuery, [id]);

    if (ciudadResult.rows.length === 0) {
      return res.status(404).render('404', { message: 'Ciudad not found' });
    }

    const estadosQuery = 'SELECT id, name FROM estados ORDER BY name';
    const estadosResult = await pool.query(estadosQuery);

    res.render('geographic/ciudad-form', {
      title: 'Edit Ciudad',
      ciudad: ciudadResult.rows[0],
      estados: estadosResult.rows,
      isNew: false,
      path: '/geographic/ciudades'
    });
  } catch (error) {
    console.error('Error fetching ciudad:', error);
    res.status(500).send('Server error');
  }
});

router.post('/ciudades/save', async (req, res) => {
  try {
    const { id, name, estado_id } = req.body;

    if (id) {
      await pool.query(
        'UPDATE ciudades SET name = $1, estado_id = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3',
        [name, estado_id, id]
      );
    } else {
      await pool.query(
        'INSERT INTO ciudades (name, estado_id) VALUES ($1, $2)',
        [name, estado_id]
      );
    }

    res.redirect('/geographic/ciudades');
  } catch (error) {
    console.error('Error saving ciudad:', error);
    res.status(500).send('Server error');
  }
});

router.post('/ciudades/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM ciudades WHERE id = $1', [id]);
    res.redirect('/geographic/ciudades');
  } catch (error) {
    console.error('Error deleting ciudad:', error);
    res.status(500).send('Server error');
  }
});

// Municipios management
router.get('/municipios', async (req, res) => {
  try {
    const query = `
      SELECT m.*, c.name as ciudad_name, e.name as estado_name,
             (SELECT COUNT(*) FROM parroquias p WHERE p.municipio_id = m.id) as parroquias_count
      FROM municipios m
      LEFT JOIN ciudades c ON m.ciudad_id = c.id
      LEFT JOIN estados e ON c.estado_id = e.id
      ORDER BY e.name, c.name, m.name
    `;
    const result = await pool.query(query);

    res.render('geographic/municipios', {
      title: 'Municipios',
      municipios: result.rows,
      path: '/geographic/municipios'
    });
  } catch (error) {
    console.error('Error fetching municipios:', error);
    res.status(500).send('Server error');
  }
});

router.get('/municipios/add', async (req, res) => {
  try {
    const query = `
      SELECT c.id, c.name, e.name as estado_name
      FROM ciudades c
      LEFT JOIN estados e ON c.estado_id = e.id
      ORDER BY e.name, c.name
    `;
    const result = await pool.query(query);

    res.render('geographic/municipio-form', {
      title: 'Add Municipio',
      municipio: {},
      ciudades: result.rows,
      isNew: true,
      path: '/geographic/municipios'
    });
  } catch (error) {
    console.error('Error fetching ciudades:', error);
    res.status(500).send('Server error');
  }
});

router.post('/municipios/save', async (req, res) => {
  try {
    const { id, name, ciudad_id } = req.body;

    if (id) {
      await pool.query(
        'UPDATE municipios SET name = $1, ciudad_id = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3',
        [name, ciudad_id, id]
      );
    } else {
      await pool.query(
        'INSERT INTO municipios (name, ciudad_id) VALUES ($1, $2)',
        [name, ciudad_id]
      );
    }

    res.redirect('/geographic/municipios');
  } catch (error) {
    console.error('Error saving municipio:', error);
    res.status(500).send('Server error');
  }
});

router.post('/municipios/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM municipios WHERE id = $1', [id]);
    res.redirect('/geographic/municipios');
  } catch (error) {
    console.error('Error deleting municipio:', error);
    res.status(500).send('Server error');
  }
});

// Parroquias management
router.get('/parroquias', async (req, res) => {
  try {
    const query = `
      SELECT p.*, m.name as municipio_name, c.name as ciudad_name, e.name as estado_name,
             (SELECT COUNT(*) FROM sectores s WHERE s.parroquia_id = p.id) as sectores_count
      FROM parroquias p
      LEFT JOIN municipios m ON p.municipio_id = m.id
      LEFT JOIN ciudades c ON m.ciudad_id = c.id
      LEFT JOIN estados e ON c.estado_id = e.id
      ORDER BY e.name, c.name, m.name, p.name
    `;
    const result = await pool.query(query);

    res.render('geographic/parroquias', {
      title: 'Parroquias',
      parroquias: result.rows,
      path: '/geographic/parroquias'
    });
  } catch (error) {
    console.error('Error fetching parroquias:', error);
    res.status(500).send('Server error');
  }
});

router.post('/parroquias/save', async (req, res) => {
  try {
    const { id, name, municipio_id } = req.body;

    if (id) {
      await pool.query(
        'UPDATE parroquias SET name = $1, municipio_id = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3',
        [name, municipio_id, id]
      );
    } else {
      await pool.query(
        'INSERT INTO parroquias (name, municipio_id) VALUES ($1, $2)',
        [name, municipio_id]
      );
    }

    res.redirect('/geographic/parroquias');
  } catch (error) {
    console.error('Error saving parroquia:', error);
    res.status(500).send('Server error');
  }
});

// Sectores management
router.get('/sectores', async (req, res) => {
  try {
    const query = `
      SELECT s.*, p.name as parroquia_name, m.name as municipio_name, c.name as ciudad_name, e.name as estado_name,
             (SELECT COUNT(*) FROM napboxes n WHERE n.sector_id = s.id) as napboxes_count
      FROM sectores s
      LEFT JOIN parroquias p ON s.parroquia_id = p.id
      LEFT JOIN municipios m ON p.municipio_id = m.id
      LEFT JOIN ciudades c ON m.ciudad_id = c.id
      LEFT JOIN estados e ON c.estado_id = e.id
      ORDER BY e.name, c.name, m.name, p.name, s.name
    `;
    const result = await pool.query(query);

    res.render('geographic/sectores', {
      title: 'Sectores',
      sectores: result.rows,
      path: '/geographic/sectores'
    });
  } catch (error) {
    console.error('Error fetching sectores:', error);
    res.status(500).send('Server error');
  }
});

router.post('/sectores/save', async (req, res) => {
  try {
    const { id, name, parroquia_id } = req.body;

    if (id) {
      await pool.query(
        'UPDATE sectores SET name = $1, parroquia_id = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3',
        [name, parroquia_id, id]
      );
    } else {
      await pool.query(
        'INSERT INTO sectores (name, parroquia_id) VALUES ($1, $2)',
        [name, parroquia_id]
      );
    }

    res.redirect('/geographic/sectores');
  } catch (error) {
    console.error('Error saving sector:', error);
    res.status(500).send('Server error');
  }
});

// Napboxes management
router.get('/napboxes', async (req, res) => {
  try {
    const query = `
      SELECT n.*, s.name as sector_name, p.name as parroquia_name, m.name as municipio_name,
             c.name as ciudad_name, e.name as estado_name
      FROM napboxes n
      LEFT JOIN sectores s ON n.sector_id = s.id
      LEFT JOIN parroquias p ON s.parroquia_id = p.id
      LEFT JOIN municipios m ON p.municipio_id = m.id
      LEFT JOIN ciudades c ON m.ciudad_id = c.id
      LEFT JOIN estados e ON c.estado_id = e.id
      ORDER BY e.name, c.name, m.name, p.name, s.name, n.name
    `;
    const result = await pool.query(query);

    res.render('geographic/napboxes', {
      title: 'Napboxes',
      napboxes: result.rows,
      path: '/geographic/napboxes'
    });
  } catch (error) {
    console.error('Error fetching napboxes:', error);
    res.status(500).send('Server error');
  }
});

router.post('/napboxes/save', async (req, res) => {
  try {
    const { id, name, code, sector_id, latitude, longitude, capacity, status } = req.body;

    if (id) {
      await pool.query(
        `UPDATE napboxes SET name = $1, code = $2, sector_id = $3, latitude = $4, longitude = $5,
         capacity = $6, status = $7, updated_at = CURRENT_TIMESTAMP WHERE id = $8`,
        [name, code, sector_id, latitude, longitude, capacity, status, id]
      );
    } else {
      await pool.query(
        `INSERT INTO napboxes (name, code, sector_id, latitude, longitude, capacity, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [name, code, sector_id, latitude, longitude, capacity, status]
      );
    }

    res.redirect('/geographic/napboxes');
  } catch (error) {
    console.error('Error saving napbox:', error);
    res.status(500).send('Server error');
  }
});

// Audit log
router.get('/audit', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 50;
    const offset = (page - 1) * limit;

    const countQuery = 'SELECT COUNT(*) FROM audit_log';
    const countResult = await pool.query(countQuery);
    const totalLogs = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalLogs / limit);

    const logsQuery = `
      SELECT * FROM audit_log
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
    `;
    const logsResult = await pool.query(logsQuery, [limit, offset]);

    res.render('geographic/audit', {
      title: 'Audit Log',
      logs: logsResult.rows,
      currentPage: page,
      totalPages: totalPages,
      path: '/geographic/audit'
    });
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
