// routes.js
const express = require('express');
const router = express.Router();
const db = require('../models/database');
const bcrypt = require('bcrypt')
const multer = require('multer');
const path = require('path');
const jwt= require('jsonwebtoken')
const moment = require('moment');
const { stat } = require('fs');
const util = require('util');
const queryAsync = util.promisify(db.query).bind(db);
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads'); 
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); 
    }
  });
  
  const upload = multer({ storage: storage });

  const verifyJwt = (req, res, next) => {
    const token = req.headers["access-token"];
    if (!token) {
      return res.json("provide token");
    } else {
      jwt.verify(token, "jwtSecretKey", (err, decoded) => {
        if (err) {

          res.json("not Authenticated");
          return res.redirect('/sign-in');

        } else {
          req.userId = decoded.id;
          req.CompanyId = decoded.CompanyId; // Ensure companyId is set from the token
          next();
        }
      });
    }
  };
 // Login logout api 
  router.get('/protected', verifyJwt, (req, res) => {
    res.json({ message: 'This is a protected route', userId: req.userId, CompanyId: req.CompanyId });
  });
  
router.get('/', (req,res)=>{
  if(req.session.name){
    return res.json({valid:true,name:req.session.name})
  } else {
    return res.json({valid:false})
  }
})
  
router.post('/sign-up', (req, res) => {
    const sql = "INSERT INTO users (name,email,password,CompanyId,role) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.CompanyId,
        'user',
    ];
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json(data);
    });
});

router.post('/sign-in', (req, res) => {
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        if (data.length > 0) {
          const id=data[0].id;
          const CompanyId = data[0].CompanyId;
          const role = data[0].role;
          req.session.role=role;
          req.session.CompanyId = CompanyId;
          req.session.name = data[0].name;
          console.log(req.session.CompanyId)
         const token = jwt.sign({id, CompanyId }, "jwtSecretKey", {expiresIn: 30000});
         const user = {
          name: data[0].name,
          email: data[0].email,
          role: data[0].role,
          CompanyId: CompanyId,
         
      };
            return res.json({Login:true,token,data,user});
        } else {
            return res.json("fail");
        }
    });
});
router.post('/sign-out', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session: ', err);
      res.status(500).json({ message: 'Error destroying session' });
    } else {
      res.clearCookie('connect.sid');
      res.json({ message: 'Sign-out successful' });
    }
  });
});
// Login logout api
// Customer page api
router.post('/customer',verifyJwt, (req, res) => {
    const sql = 'INSERT INTO customers SET ?';
    const values = req.body;
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting data: ', err);
            res.status(500).send(err.message);

        } else {
            console.log('Data inserted successfully');
            res.status(200).send('Data inserted successfully');
        }
    });
});

router.get('/customer',verifyJwt, async (req, res) => {
  try {
    const sql = 'SELECT customerId, customerDisplayName, companyName, accno, relativeno, customerEmail, customerPhone FROM customers';
    
    const result = await new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) {
          console.error('Error fetching data: ', err);
          reject(err);
        } else {
          console.log('Data fetched successfully');
          resolve(result);
        }
      });
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});
router.get('/customerid' ,async (req, res) => {
  try {
    const sql = 'SELECT customerId FROM customers';
    
    const result = await new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) {
          console.error('Error fetching data: ', err);
          reject(err);
        } else {
          console.log('Data fetched successfully');
          resolve(result);
        }
      });
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});
router.get('/defaultcustomerid', (req, res) => {
  try {
    const sql = 'SELECT MAX(customerId) AS maxCustomerId FROM customers';
    
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error fetching default customerId: ', err);
        res.status(500).json({ error: 'Error fetching default customerId' });
      } else {
        let maxCustomerId = result[0]?.maxCustomerId || 0;
        if(maxCustomerId === 0)
        {
          maxCustomerId = 45100
        }
        const defaultCustomerId = maxCustomerId + 1;

        console.log('Default customerId fetched successfully');
        res.status(200).json({ defaultCustomerId });
      }
    });
  } catch (error) {
    console.error('Error fetching default customerId: ', error);
    res.status(500).json({ error: 'Error fetching default customerId' });
  }
});
router.delete('/customer/:customerId', (req, res) => {
  const customerId = req.params.customerId;
  const sql = 'DELETE FROM customers WHERE customerId = ?';
  db.query(sql, [customerId], (err, result) => {
      if (err) {
          console.error('Error deleting data: ', err);
          res.status(500).json({ error: 'Error deleting data' });
      } else {
          console.log('Data deleted successfully');
          res.status(200).json({ message: 'Data deleted successfully' });
      }
  });
});
router.get('/getMaxAccNo', async (req, res) => {
  try {
    const nextAccNo = await getNextAccNo();
    res.json({ nextAccNo });
  } catch (error) {
    console.error('Error fetching max accno:', error);
    res.status(500).json({ error: 'Error fetching max accno' });
  }
});

async function getNextAccNo() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT MAX(CAST(SUBSTRING(accno, 3) AS SIGNED)) AS maxAccNo FROM customers';

    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error fetching max accno: ', err);
        reject(err);
      } else {
        let maxAccNo = result[0]?.maxAccNo || 0;
        if (maxAccNo === 0) {
          maxAccNo = 999;
        }
        const nextAccNo = `AS${maxAccNo + 1}`;

        console.log('Next accno fetched successfully');
        resolve(nextAccNo);
      }
    });
  });
}
router.post('/master', (req, res) => {
  const { relativeno, accno, accname } = req.body;

  const masterSql = 'INSERT INTO masteraccounts (relativeno, accno, accname, acctype, mainhead, subhead, systemacc) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const masterValues = [relativeno, accno, accname, 'A', 'Assets', 'Current Assets', 'U'];

  db.query(masterSql, masterValues, (err, result) => {
    if (err) {
      console.error('Error inserting data into master table: ', err);
      res.status(500).send('Error inserting data into master table');
    } else {
      console.log('Data inserted successfully into master table');
      res.status(200).send('Data inserted successfully into master table');
    }
  });
});
router.post('/masterExtended', (req, res) => {
  const { relativeno, accno, accname, acctype, mainhead, subhead, imagekey, systemacc } = req.body;

  const masterSql = 'INSERT INTO masteraccounts (relativeno, accno, accname, acctype, mainhead, subhead, imagekey, systemacc) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const masterValues = [relativeno, accno, accname, acctype, mainhead, subhead, imagekey, systemacc];

  db.query(masterSql, masterValues, (err, result) => {
    if (err) {
      console.error('Error inserting data into master table: ', err);
      res.status(500).send('Error inserting data into master table');
    } else {
      console.log('Data inserted successfully into master table');
      res.status(200).send('Data inserted successfully into master table');
    }
  });
});


router.get('/editcustomer/:customerId', (req, res) => {
  const { customerId } = req.params;
  const sql = 'SELECT * FROM customers WHERE customerId = ?';
  db.query(sql, [customerId], (err, result) => {
      if (err) {
          console.error('Error fetching data: ', err);
          res.status(500).send('Error fetching data');
      } else {
          console.log('Data fetched successfully');
          res.status(200).json(result);
      }
  });
});

router.put('/updatecustomer/:customerId', (req, res) => {
  const customerId = req.params.customerId;
  const updatedData = req.body;
 
  const sql = 'UPDATE customers SET ? WHERE customerId = ?';
  db.query(sql, [updatedData, customerId], (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).send(err.message);
    } else {
      if (updatedData.customerDisplayName) {
        const accno = updatedData.accno
        // Update masteraccounts table with the value of customerDisplayName
        const masterSql = 'UPDATE masteraccounts SET accname = ? WHERE accno = ?';
        const masterValues = [updatedData.customerDisplayName, accno];

        db.query(masterSql, masterValues, (masterErr, masterResult) => {
          if (masterErr) {
            console.error('Error updating data in masteraccounts table:', masterErr);
            res.status(500).send(err.message);
          } else {
            console.log('Data updated successfully in masteraccounts table');
            res.status(200).json({ message: `Customer with ID ${customerId} updated successfully` });
          }
        });
      } else {
        console.log('Data updated successfully');
        res.status(200).json({ message: `Customer with ID ${customerId} updated successfully` });
      }
    }
  });
});
router.get('/Accountsno/:accno', (req, res) => {
  const { accno } = req.params;
  console.log(accno)
  const CompanyId = req.session.CompanyId;
  const sql = 'SELECT * FROM accountstransactions WHERE accno = ? AND CompanyId = ?';
  
  db.query(sql, [accno, CompanyId], (err, result) => {
    if (err) {
      console.error('Error fetching data: ', err);
      res.status(500).json({ error: 'Error fetching data' });
    } else {
      console.log('Data fetched successfully');
      res.status(200).json(result);
    }
  });
});
// Customer page api
// Chart Account api

router.get('/getAccname', async (req, res) => {
  try {
    const sql = `SELECT * FROM masteraccounts WHERE systemacc='S' AND acctype='G' `;
    
    const result = await new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) {
          console.error('Error fetching data: ', err);
          reject(err);
        } else {
          console.log('Data fetched successfully');
          resolve(result);
        }
      });
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});
router.post('/savechart', async (req, res) => {
  try {
    const { ChartDetails, accname, Number } = req.body;
    const [accno, mainhead] = ChartDetails.split(',');

    const generateAccno = async (mainhead) => {
      const prefixMap = {
        Assets: 'AS',
        Liabilities: 'LB',
        Expenses: 'EX',
        Equity: 'EQ',
        Income: 'IN',
      };

      const accnoPrefix = prefixMap[mainhead] || 'UNKNOWN';

      const queryMaxAccno = `SELECT MAX(SUBSTRING(accno, 3)) AS maxAccno FROM masteraccounts WHERE mainhead = '${mainhead}'`;
      const resultMaxAccno = await queryAsync(queryMaxAccno);

      const maxAccno = resultMaxAccno[0].maxAccno || 0;
      const nextAccno = `${accnoPrefix}${parseInt(maxAccno, 10) + 1}`;

      return nextAccno;
    };

    const nextAccno = await generateAccno(mainhead);

    const modifiedAccname = Number ? `${accname}-${Number}` : accname;

    const query = `INSERT INTO masteraccounts (relativeno, accno, accname, mainhead, subhead, acctype, systemacc) VALUES ('${accno}', '${nextAccno}', '${modifiedAccname}', '${mainhead}', '${accname}', 'G', 'U')`;

    const result = await queryAsync(query);

    console.log('Data added successfully to masteraccounts table');
    res.status(200).send('Data added successfully');
  } catch (error) {
    console.error('Error processing request: ', error);
    res.status(500).send('Error processing request');
  }
});

router.get('/getchartAcc', async (req, res) => {
  try {
    const sql = `SELECT * FROM masteraccounts WHERE systemacc='U' AND acctype='G' `;
    
    const result = await new Promise((resolve, reject) => {
      db.query(sql, async (err, result) => {
        if (err) {
          console.error('Error fetching data: ', err);
          reject(err);
        } else {
          console.log('Data fetched successfully');

          // Fetch accname for each relativeno and push the "Type" property to the result
          await Promise.all(result.map(async (item) => {
            const accnameQuery = `SELECT accname FROM masteraccounts WHERE accno = '${item.relativeno}' AND systemacc='S' AND acctype='G'`;
            const accnameResult = await new Promise((resolveAcc, rejectAcc) => {
              db.query(accnameQuery, (errAcc, resultAcc) => {
                if (errAcc) {
                  console.error('Error fetching accname: ', errAcc);
                  rejectAcc(errAcc);
                } else {
                  const accname = resultAcc[0]?.accname || ''; // Use the accname or an empty string if not found
                  item.Type = accname; // Push the "Type" property to the item
                  resolveAcc(accname);
                }
              });
            });
          }));

          resolve(result);
        }
      });
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});
router.delete('/chartremove/:sno', (req, res) => {
  const sno = req.params.sno;
  const sql = 'DELETE FROM masteraccounts WHERE sno = ?';
  db.query(sql, [sno], (err, result) => {
      if (err) {
          console.error('Error deleting data: ', err);
          res.status(500).json({ error: 'Error deleting data' });
      } else {
          console.log('Data deleted successfully');
          res.status(200).json({ message: 'Data deleted successfully' });
      }
  });
});

// Edit chart data
router.get('/editchart/:sno', async (req, res) => {
  try {
    const sno = req.params.sno;

    // First query to get relativeno and accname
    const query1 = `SELECT relativeno, accname FROM masteraccounts WHERE sno = ${sno}`;
    const result1 = await new Promise((resolve, reject) => {
      db.query(query1, (err, result) => {
        if (err) {
          console.error('Error fetching chart data: ', err);
          reject(err);
        } else {
          console.log('Chart data fetched successfully');
          resolve(result);
        }
      });
    });

    if (result1.length > 0) {
      // Extracting data from the first query result
      const { relativeno, accname } = result1[0];

      // Second query to get additional data based on relativeno
      const query2 = `SELECT * FROM masteraccounts WHERE accno = '${relativeno}' AND systemacc='S' AND acctype='G'`;

      const result2 = await new Promise((resolve, reject) => {
        db.query(query2, (err, result) => {
          if (err) {
            console.error('Error fetching additional chart data: ', err);
            reject(err);
          } else {
            console.log('Additional chart data fetched successfully');
            resolve(result);
          }
        });
      });

      if (result2.length > 0) {
        // Create chartData object with required properties
        const chartData = {
          ChartDetails: `${result2[0].accno},${result2[0].mainhead},${relativeno},${result2[0].accname},${result2[0].acctype},${result2[0].subhead},${result2[0].imagekey},${result2[0].systemacc}`,
          accname: accname,
        };

        res.status(200).json(chartData);
      } else {
        res.status(404).send('Additional chart data not found');
      }
    } else {
      res.status(404).send('Chart data not found');
    }
  } catch (error) {
    console.error('Error fetching chart data: ', error);
    res.status(500).send('Error fetching chart data');
  }
});



router.put('/updatechart/:sno', async (req, res) => {
  try {
    const sno = req.params.sno;
    const { ChartDetails, accname, Number } = req.body;

    // Assuming ChartDetails contains relativeno, set accno as relativeno
    const [accno, mainhead] = ChartDetails.split(',');

    // Function to generate accno based on mainhead and increment the max number
    const generateAccno = async (mainhead) => {
      const prefixMap = {
        Assets: 'AS',
        Liabilities: 'LB',
        Expenses: 'EX',
        Equity: 'EQ',
        Income: 'IN',
      };

      const accnoPrefix = prefixMap[mainhead] || 'UNKNOWN';

      // Query the database to find the maximum accno for the given mainhead
      const queryMaxAccno = `SELECT MAX(SUBSTRING(accno, 3)) AS maxAccno FROM masteraccounts WHERE mainhead = '${mainhead}'`;
      const resultMaxAccno = await queryAsync(queryMaxAccno);

      const maxAccno = resultMaxAccno[0].maxAccno || 0; // If no existing accno, start from 0
      const nextAccno = `${accnoPrefix}${parseInt(maxAccno, 10) + 1}`;

      return nextAccno;
    };

    // Generate accno based on mainhead
    const nextAccno = await generateAccno(mainhead);

    // If Number is provided, append it to accname
    const modifiedAccname = Number ? `${accname}-${Number}` : accname;

    // Update data in the masteraccounts table
    const updateQuery = `UPDATE masteraccounts SET relativeno='${accno}', accno='${nextAccno}', accname='${modifiedAccname}', mainhead='${mainhead}', subhead='${accname}', acctype='G', systemacc='U' WHERE sno = ${sno}`;
    const result = await queryAsync(updateQuery);

    console.log('Data updated successfully in masteraccounts table');
    res.status(200).send('Data updated successfully');
  } catch (error) {
    console.error('Error processing request: ', error);
    res.status(500).send('Error processing request');
  }
});

// Chart Account api
// Stock page api
router.get('/Stock',verifyJwt, (req, res) => {
  const sql = 'SELECT ItemId, ItemName, ItemType, Barcode, UnitPrice, Image FROM itemmaster';
  db.query(sql, (err, result) => {
    if (err) {  
      console.error('Error fetching data: ', err);
      res.status(500).send('Error fetching data');
    } else {
      console.log('Data fetched successfully');
      const itemsWithBase64Image = result.map(item => ({
        ...item,
        Image: item.Image ? item.Image.toString('base64') : null
      }));

      res.status(200).json(itemsWithBase64Image);
      
    }
  });
});
router.get('/defaultstockid', (req, res) => {
  try {
    const sql = 'SELECT MAX(ItemId) AS maxStockId FROM itemmaster';
    
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error fetching default stockId: ', err);
        res.status(500).json({ error: 'Error fetching default stockId' });
      } else {
        let maxStockId = result[0]?.maxStockId || 0;
        if(maxStockId === 0)
        {
          maxStockId = 2099
        }
        const defaultStockId = maxStockId + 1;

        console.log('Default customerId fetched successfully');
        res.status(200).json({ defaultStockId });
      }
    });
  } catch (error) {
    console.error('Error fetching default customerId: ', error);
    res.status(500).json({ error: 'Error fetching default customerId' });
  }
});
router.delete('/stock/:ItemId', (req, res) => {
  const ItemId = req.params.ItemId;
  const sql = 'DELETE FROM itemmaster WHERE ItemId = ?';
  db.query(sql, [ItemId], (err, result) => {
      if (err) {
          console.error('Error deleting data: ', err);
          res.status(500).json({ error: 'Error deleting data' });
      } else {
          console.log('Data deleted successfully');
          res.status(200).json({ message: 'Data deleted successfully' });
      }
  });
});
router.get('/getItemCategorys', (req, res) => {
  const sql = "SELECT * FROM invcategory WHERE status='0' "; 
  db.query(sql, (err, data) => {
    if (err) {
      console.error('Error retrieving item category: ', err);
      res.status(500).json({ error: 'Error retrieving item category' });
    } else {
      res.status(200).json(data);
    }
  });
});
router.get('/getUnits', (req, res) => {
  const sql = "SELECT * FROM invunit WHERE status='0' "; 
  db.query(sql, (err, data) => {
      if (err) {
          console.error('Error retrieving item unit: ', err);
          res.status(500).json({ error: 'Error retrieving item unit' });
      } else {
        res.status(200).json(data);
      }
  });
});
router.post('/saveData', upload.single('Image'), (req, res) => {
  const { filename: Image = null } = req.file || {};
  const sql = 'INSERT INTO itemmaster SET ?'; 
  const values = { ...req.body, Image };
  
  db.query(sql, values, (err, data) => {
    if (err) {
      console.error('Error saving data: ', err);
      res.status(500).json({ error: 'Error saving data' });
    } else {
    console.log('Data saved successfully');
    res.status(200).json({ message: 'Data saved successfully', data });
  }
});
});
router.get('/getItem', (req, res) => {
const sql = "SELECT ItemId, ItemName, Barcode, AddDesc, UnitId, MinimumQty, UnitPrice FROM itemmaster"; // Assuming the table name is invcategory and the columns are id and itemcategory
db.query(sql, (err, data) => {
  if (err) {
    console.error('Error retrieving item category: ', err);
    res.status(500).json({ error: 'Error retrieving item category' });
  } else {
    res.status(200).json(data);
  }
});
});
router.get('/editstock/:ItemId', (req, res) => {
  const { ItemId } = req.params;
  const sql = 'SELECT * FROM itemmaster WHERE ItemId = ?';
  db.query(sql, [ItemId], (err, result) => {
      if (err) {
          console.error('Error fetching data: ', err);
          res.status(500).send('Error fetching data');
      } else {
          console.log('Data fetched successfully');
          res.status(200).json(result);
      }
  });
});
router.put('/updatestock/:ItemId', (req, res) => {
  const ItemId = req.params.ItemId; 
  const updatedData = req.body; 

 
  const sql = 'UPDATE itemmaster SET ? WHERE ItemId = ?';
  db.query(sql, [updatedData, ItemId], (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).json({ error: 'Error updating data' });
    } else {
      console.log('Data updated successfully');
      res.status(200).json({ message: `Stock with ID ${ItemId} updated successfully` });
    }
  });
});
// Stock page api
// Terms api 
router.delete('/terms/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM paymentterms WHERE id = ?';
  db.query(sql, [id], (err, result) => {
      if (err) {
          console.error('Error deleting data: ', err);
          res.status(500).json({ error: 'Error deleting data' });
      } else {
          console.log('Data deleted successfully');
          res.status(200).json({ message: 'Data deleted successfully' });
      }
  });
})
router.post('/saveterms', (req, res) => {
  const { Name,Terms } = req.body;

  const sql = 'INSERT INTO paymentterms (Name,Terms) VALUES (?, ?)';
  db.query(sql, [Name,Terms], (err, data) => {
    if (err) {
      console.error('Error saving terms: ', err);
      res.status(500).json({ error: 'Error saving terms' });
    } else {
      console.log('terms added successfully');
      const responseData = {
        message: 'terms added successfully',
        data: data,
      };
      res.status(200).json(responseData);
    }
  });
});
router.get('/getterms', (req, res) => {
  const sql = "SELECT * FROM paymentterms"; 
  db.query(sql, (err, data) => {
    if (err) {
      console.error('Error retrieving item terms: ', err);
      res.status(500).json({ error: 'Error retrieving item terms' });
    } else {
      res.status(200).json(data);
    }
  });
});
router.get('/editterms/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM paymentterms WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error fetching data: ', err);
      res.status(500).send('Error fetching data');
    } else {
      console.log('Data fetched successfully');
      res.status(200).json(result);
    }
  });
});
router.put('/updateterms/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  const sql = 'UPDATE paymentterms SET ? WHERE id = ?';
  db.query(sql, [updatedData, id], (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).json({ error: 'Error updating data' });
    } else {
      console.log('Data updated successfully');
      res.status(200).json({ message: `terms with ID ${id} updated successfully` });
    }
  });
});
// Terms api 
// Category page api
router.delete('/category/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM invcategory WHERE id = ?';
  db.query(sql, [id], (err, result) => {
      if (err) {
          console.error('Error deleting data: ', err);
          res.status(500).json({ error: 'Error deleting data' });
      } else {
          console.log('Data deleted successfully');
          res.status(200).json({ message: 'Data deleted successfully' });
      }
  });
})
router.post('/saveCategory', (req, res) => {
  const { itemcategory, disable } = req.body; // Assuming you're sending 'disable' in the request body

  const status = disable ? 1 : 0;

  const sql = 'INSERT INTO invcategory (itemcategory, status) VALUES (?, ?)';
  db.query(sql, [itemcategory, status], (err, data) => {
    if (err) {
      console.error('Error saving category: ', err);
      res.status(500).json({ error: 'Error saving category' });
    } else {
      console.log('Category added successfully');
      const responseData = {
        message: 'Category added successfully',
        data: data,
      };
      res.status(200).json(responseData);
    }
  });
});
router.get('/getItemCategory', (req, res) => {
  const sql = "SELECT * FROM invcategory"; 
  db.query(sql, (err, data) => {
    if (err) {
      console.error('Error retrieving item category: ', err);
      res.status(500).json({ error: 'Error retrieving item category' });
    } else {
      res.status(200).json(data);
    }
  });
});
router.get('/editcategory/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM invcategory WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error fetching data: ', err);
      res.status(500).send('Error fetching data');
    } else {
      console.log('Data fetched successfully');
      res.status(200).json(result);
    }
  });
});
router.put('/updatecategory/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  updatedData.status = updatedData.disable ? 1 : 0;
  delete updatedData.disable; // Remove the 'disable' property

  const sql = 'UPDATE invcategory SET ? WHERE id = ?';
  db.query(sql, [updatedData, id], (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).json({ error: 'Error updating data' });
    } else {
      console.log('Data updated successfully');
      res.status(200).json({ message: `Category with ID ${id} updated successfully` });
    }
  });
});
// Category page api
// Group page api
router.delete('/stockGroup/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM invgroup WHERE id = ?';
  db.query(sql, [id], (err, result) => {
      if (err) {
          console.error('Error deleting data: ', err);
          res.status(500).json({ error: 'Error deleting data' });
      } else {
          console.log('Data deleted successfully');
          res.status(200).json({ message: 'Data deleted successfully' });
      }
  });
});
router.post('/saveGroupName', (req, res) => {
  const { groupName,disable } = req.body;
  const status = disable ? 1 : 0;
  const sql = "INSERT INTO invgroup (groupName,status) VALUES (?,?)"; // Assuming the table name is invgroup and the column name is groupName
  db.query(sql, [groupName,status], (err, data) => {
      if (err) {
          console.error('Error saving group name: ', err);
          res.status(500).json({ error: 'Error saving group name' });
      } else {
          console.log('Group name saved successfully');
          const responseData = {
              message: 'Group name saved successfully',
              data: data // Assuming the data from the query is returned in the variable 'data'
          };
          res.status(200).json(responseData);
      }
  });
});
router.get('/getItemGroups', (req, res) => {
  const sql = "SELECT * FROM invgroup"; 
  db.query(sql, (err, data) => {
      if (err) {
          console.error('Error retrieving item groups: ', err);
          res.status(500).json({ error: 'Error retrieving item groups' });
      } else {
        res.status(200).json(data);
      }
  });
});

router.get('/editStockGroup/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM invgroup WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error fetching data: ', err);
      res.status(500).send('Error fetching data');
    } else {
      console.log('Data fetched successfully');
      res.status(200).json(result);
    }
  });
});
router.put('/updateStockGroup/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  updatedData.status = updatedData.disable ? 1 : 0;
  delete updatedData.disable;

  const sql = 'UPDATE invgroup SET ? WHERE id = ?';
  db.query(sql, [updatedData, id], (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).json({ error: 'Error updating data' });
    } else {
      console.log('Data updated successfully');
      res.status(200).json({ message: `Category with ID ${id} updated successfully` });
    }
  });
});
// Group page api
// Brand page api
router.delete('/brand/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM invbrand WHERE id = ?';
  db.query(sql, [id], (err, result) => {
      if (err) {
          console.error('Error deleting data: ', err);
          res.status(500).json({ error: 'Error deleting data' });
      } else {
          console.log('Data deleted successfully');
          res.status(200).json({ message: 'Data deleted successfully' });
      }
  });
});
router.get('/getBrands', (req, res) => {
  const sql = "SELECT * FROM invbrand"; 
  db.query(sql, (err, data) => {
      if (err) {
          console.error('Error retrieving brand: ', err);
          res.status(500).json({ error: 'Error retrieving brand' });
      } else {
        res.status(200).json(data);
      }
  });
});
router.post('/saveBrandName', (req, res) => {
  const { brandname,disable } = req.body;
  const status = disable ? 1 : 0;
  const sql = "INSERT INTO invbrand (brandname,status) VALUES (?,?)"; 
  db.query(sql, [brandname,status], (err, data) => {
      if (err) {
          console.error('Error saving group name: ', err);
          res.status(500).json({ error: 'Error saving brand name' });
      } else {
          console.log('Brand name saved successfully');
          const responseData = {
              message: 'Brand name saved successfully',
              data: data // Assuming the data from the query is returned in the variable 'data'
          };
          res.status(200).json(responseData);
      }
  });
});
router.get('/editBrand/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM invbrand WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error fetching data: ', err);
      res.status(500).send('Error fetching data');
    } else {
      console.log('Data fetched successfully');
      res.status(200).json(result);
    }
  });
});
router.put('/updateBrand/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  updatedData.status = updatedData.disable ? 1 : 0;
  delete updatedData.disable; 

  const sql = 'UPDATE invbrand  SET ? WHERE id = ?';
  db.query(sql, [updatedData, id], (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).json({ error: 'Error updating data' });
    } else {
      console.log('Data updated successfully');
      res.status(200).json({ message: `Category with ID ${id} updated successfully` });
    }
  });
});
// Brand page api
// Unit page api
router.delete('/unit/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM invunit WHERE id = ?';
  db.query(sql, [id], (err, result) => {
      if (err) {
          console.error('Error deleting data: ', err);
          res.status(500).json({ error: 'Error deleting data' });
      } else {
          console.log('Data deleted successfully');
          res.status(200).json({ message: 'Data deleted successfully' });
      }
  });
});
router.post('/saveUnit', (req, res) => {
    const { shortname, fullname,disable } = req.body;
    const status = disable ? 1 : 0;
    const sql = "INSERT INTO invunit (shortname, fullname, status) VALUES (?, ?, ?)";
    db.query(sql, [shortname, fullname,status], (err, data) => {
      if (err) {
        console.error('Error saving unit: ', err);
        res.status(500).json({ error: 'Error saving unit' });
      } else {
        console.log('Unit saved successfully');
        const responseData = {
          message: 'Unit saved successfully',
          data: data, // Assuming the data from the query is returned in the variable 'data'
        };
        res.status(200).json(responseData);
      }
    });
  });
  router.get('/getUnit', (req, res) => {
      const sql = "SELECT * FROM invunit";
      db.query(sql, (err, data) => {
          if (err) {
              console.error('Error retrieving item unit: ', err);
              res.status(500).json({ error: 'Error retrieving item unit' });
          } else {
            res.status(200).json(data);
          }
      });
  });
  router.get('/editUnit/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM invunit WHERE id = ?';
  
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error fetching data: ', err);
        res.status(500).send('Error fetching data');
      } else {
        console.log('Data fetched successfully');
        res.status(200).json(result);
      }
    });
  });
  router.put('/updateUnit/:id', (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    updatedData.status = updatedData.disable ? 1 : 0;
    delete updatedData.disable;
  
    const sql = 'UPDATE invunit SET ? WHERE id = ?';
    db.query(sql, [updatedData, id], (err, result) => {
      if (err) {
        console.error('Error updating data:', err);
        res.status(500).json({ error: 'Error updating data' });
      } else {
        console.log('Data updated successfully');
        res.status(200).json({ message: `Unit with ID ${id} updated successfully` });
      }
    });
  });
// Unit page api
// Invoice page api
router.get('/getCustomerDetails', (req, res) => {
  const sql = "SELECT customerId, companyName, accno,dueOnReceipt FROM customers WHERE types != 'offline'"; // Assuming the table name is invcategory and the columns are id and itemcategory
  db.query(sql, (err, data) => {
    if (err) {
      console.error('Error retrieving item category: ', err);
      res.status(500).json({ error: 'Error retrieving item category' });
    } else {
      res.status(200).json(data);
    }
  });
});
router.post('/saveVoucher', (req, res) => {
  const CompanyId = req.session.CompanyId;
  console.log(CompanyId)
  const { VoucherNo, items } = req.body;

  let values = [];
  let sql = 'INSERT INTO sales_voucher_details (VoucherNo, ItemId, Description, UnitId, Sold_Qty, UnitPrice, GrossAmt, CompanyId) VALUES ';

  items.forEach((item, index) => {
    sql += '(?, ?, ?, ?, ?, ?, ?, ?)';
    values = values.concat([VoucherNo, item.ItemId, item.Description, item.UnitId, item.Sold_Qty, item.UnitPrice, item.GrossAmt, CompanyId]);

    if (index !== items.length - 1) {
      sql += ', ';
    }
  });

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data into SalesVoucher table: ', err);
      res.status(500).send('Error inserting data into SalesVoucher table');
    } else {
      console.log('Data inserted successfully into SalesVoucher table');
      res.status(200).send('Data inserted successfully SalesVoucher table');
    }
  });
});
router.post('/saveInvoice', (req, res) => {
  const CompanyId = req.session.CompanyId;
  console.log(CompanyId)
  
  const { CustomerDetail, VoucherDate, Duedate, VoucherNo, Refrence, GrossAmount, DeliveryNote, Terms } = req.body;
  const [customerId, companyName ,accno] = CustomerDetail.split(',');

  const query = `INSERT INTO sales_voucher (CustomerName, Customer_ID, VoucherDate, DueDate, VoucherNo, Refrence, GrossAmount, DeliveryNote, CompanyId) 
    VALUES ('${companyName}', '${customerId}', '${VoucherDate}', '${Duedate}', '${VoucherNo}', '${Refrence}', '${GrossAmount}','${DeliveryNote}', '${CompanyId}')`;

    db.query(query, (err, result) => {
      if (err) {
        console.error('Error saving data to sales_voucher: ', err);
        res.status(500).send('Error saving data to database');
        return;
      }
  
      // Insert into accounts table - First row
      const accountsQuery1 = `INSERT INTO accountstransactions (transdate, accno, particulars, debit, credit, vouchertype, voucherno, fcdebit, fccredit, CompanyId)
        VALUES ('${VoucherDate}','${accno}', '${companyName}', '${GrossAmount}', '0', 'Sales Voucher', '${VoucherNo}', '${GrossAmount}', '0', '${CompanyId}')`;
  
      db.query(accountsQuery1, (accountsErr1, accountsResult1) => {
        if (accountsErr1) {
          console.error('Error saving data to accounts (row 1): ', accountsErr1);
          res.status(500).send('Error saving data to database');
        } else {
          // Insert into accounts table - Second row
          const accountsQuery2 = `INSERT INTO accountstransactions (transdate, accno, particulars, debit, credit, vouchertype, voucherno, fcdebit, fccredit, CompanyId)
            VALUES ('${VoucherDate}', 'IN33', 'Sales Income', '0', '${GrossAmount}', 'Sales', '${VoucherNo}', '0', '${GrossAmount}', '${CompanyId}')`;
  
          db.query(accountsQuery2, (accountsErr2, accountsResult2) => {
            if (accountsErr2) {
              console.error('Error saving data to accounts (row 2): ', accountsErr2);
              res.status(500).send('Error saving data to database');
            } else {
              console.log('Data added successfully to both tables'); 
              res.status(200).send('Data added successfully');
            }
          });
        }
      });
    });
    if (DeliveryNote) {
      // Update query for cust_deliverynote table
      const updateStatusQuery = `
        UPDATE cust_deliverynote
        SET status = 'delivered'
        WHERE VoucherNo = '${DeliveryNote}';
      `;

      // Execute the update query
      db.query(updateStatusQuery, (updateStatusErr, updateStatusResult) => {
        if (updateStatusErr) {
          console.error('Error updating delivery note status:', updateStatusErr);
          // Handle the error as needed
        } else {
          console.log('Delivery note status updated successfully');
        }
      });
    }

});
router.delete('/removeData/:VoucherNo', (req, res) => {
  const { VoucherNo } = req.params;

  // Delete data from sales_voucher_details table
  const voucherDetailsQuery = 'DELETE FROM sales_voucher_details WHERE VoucherNo = ?';

  db.query(voucherDetailsQuery, [VoucherNo], (voucherDetailsErr, voucherDetailsResult) => {
    if (voucherDetailsErr) {
      console.error('Error deleting data from sales_voucher_details:', voucherDetailsErr);
      res.status(500).send('Error deleting data from sales_voucher_details');
      return;
    }

    // Delete data from accountstransactions table
    const accountsQuery = 'DELETE FROM accountstransactions WHERE voucherno = ?';

    db.query(accountsQuery, [VoucherNo], (accountsErr, accountsResult) => {
      if (accountsErr) {
        console.error('Error deleting data from accountstransactions:', accountsErr);
        res.status(500).send('Error deleting data from accountstransactions');
        return;
      }

      // Delete data from sales_voucher table
      const voucherQuery = 'DELETE FROM sales_voucher WHERE VoucherNo = ?';

      db.query(voucherQuery, [VoucherNo], (voucherErr, voucherResult) => {
        if (voucherErr) {
          console.error('Error deleting data from sales_voucher:', voucherErr);
          res.status(500).send('Error deleting data from sales_voucher');
          return;
        }

        console.log('Data deleted successfully from both tables');
        res.status(200).send('Data deleted successfully from both tables');
      });
    });
  });
});
router.get('/getinvoice',verifyJwt, (req, res) => {
  const CompanyId = req.session.CompanyId;
  const sql = "SELECT V_ID, VoucherNo, VoucherDate,DueDate, CustomerName, GrossAmount, Refrence FROM sales_voucher WHERE CompanyId = ?"; 
  db.query(sql,[CompanyId], (err, data) => {
    if (err) {
      console.error('Error retrieving sales_voucher: ', err);
      res.status(500).json({ error: 'Error retrieving sales_voucher' });
    } else {
      res.status(200).json(data);
    }
  });
});
router.get('/getMaxvoucherNo', async (req, res) => {
  try {
    const nextvoucherNo = await getNextvoucherNo();
    res.json({ nextvoucherNo });
  } catch (error) {
    console.error('Error fetching max voucherno:', error);
    res.status(500).json({ error: 'Error fetching max voucherno' });
  }
});
async function getNextvoucherNo() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT MAX(CAST(SUBSTRING(VoucherNo,3) AS SIGNED)) AS maxvoucherNo FROM sales_voucher ';

    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error fetching max voucherno: ', err);
        reject(err);
      } else {
        let maxvoucherNo = result[0]?.maxvoucherNo || 0;
        if (maxvoucherNo === 0) {
          maxvoucherNo = 100;
        }
        const nextvoucherNo = `IN${maxvoucherNo + 1}`;

        console.log('Next voucherNo fetched successfully');
        resolve(nextvoucherNo);
      }
    });
  });
}
router.put('/updateVoucher/:VoucherNo', (req, res) => {
  const { VoucherNo } = req.params;
  const { items } = req.body;
  const CompanyId = req.session.CompanyId; 

  // Get the existing items for the given VoucherNo
  const getExistingItemsSql = 'SELECT SDet_ID FROM sales_voucher_details WHERE VoucherNo = ? AND CompanyId = ?';
  const getExistingItemsValues = [VoucherNo, CompanyId];

  db.query(getExistingItemsSql, getExistingItemsValues, (err, existingItemsResult) => {
    if (err) {
      console.error(`Error fetching existing items for VoucherNo ${VoucherNo}: `, err);
      return res.status(500).send('Internal Server Error');
    }

    const existingSDetIDs = existingItemsResult.map((item) => item.SDet_ID);

    // Identify the SDet_IDs that need to be removed
    const itemsToRemove = existingSDetIDs.filter((existingSDetID) => !items.some((item) => item.SDet_ID === existingSDetID));

    // Remove items
    if (itemsToRemove.length > 0) {
      const removeItemsSql = `DELETE FROM sales_voucher_details WHERE VoucherNo = ? AND SDet_ID IN (?) AND CompanyId = ?`;
      const removeItemsValues = [VoucherNo, itemsToRemove, CompanyId];

      db.query(removeItemsSql, removeItemsValues, (removeErr, removeResult) => {
        if (removeErr) {
          console.error(`Error removing items for VoucherNo ${VoucherNo}: `, removeErr);
          return res.status(500).send('Internal Server Error');
        }

        console.log(`Removed items successfully for VoucherNo ${VoucherNo}`);
      });
    }

    // Update or insert items
   // Update or insert items
items.forEach((item, index) => {
  const { SDet_ID, ItemId, Description, Sold_Qty, UnitId, UnitPrice, GrossAmt } = item;

  const sql = SDet_ID
    ? 'UPDATE sales_voucher_details SET ItemId = ?, Description = ?, Sold_Qty = ?, UnitId = ?, UnitPrice = ?, GrossAmt = ? WHERE VoucherNo = ? AND SDet_ID = ? AND CompanyId = ?'
    : 'INSERT INTO sales_voucher_details (ItemId, Description, Sold_Qty, UnitId, UnitPrice, GrossAmt, VoucherNo, CompanyId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    
  const values = SDet_ID
    ? [ItemId, Description, Sold_Qty, UnitId, UnitPrice, GrossAmt, VoucherNo, SDet_ID, CompanyId]
    : [ItemId, Description, Sold_Qty, UnitId, UnitPrice, GrossAmt, VoucherNo, CompanyId];

  db.query(sql, values, (updateErr, result) => {
    if (updateErr) {
      console.error(`Error updating/inserting data in sales_voucher_details table for VoucherNo ${VoucherNo}: `, updateErr);
    } else {
      console.log(`Data updated/inserted successfully in sales_voucher_details table for VoucherNo ${VoucherNo}`);
    }
  });
});


    res.status(200).send('Data updated successfully in SalesVoucherDetails table');
  });
});
router.put('/updateInvoice/:VoucherNo', (req, res) => {
  const { VoucherNo } = req.params;
  const { CustomerDetail, VoucherDate, Duedate, Refrence, GrossAmount, DeliveryNote } = req.body;
  const [customerId, companyName, accno] = CustomerDetail.split(',');
  const CompanyId = req.session.CompanyId;

  // Update sales_voucher table
  const salesVoucherQuery = `UPDATE sales_voucher SET 
    CustomerName = '${companyName}', 
    Customer_ID = '${customerId}', 
    VoucherDate = '${VoucherDate}', 
    DueDate = '${Duedate}', 
    Refrence = '${Refrence}', 
    GrossAmount = '${GrossAmount}',
    DeliveryNote = '${DeliveryNote}' 
    WHERE VoucherNo = '${VoucherNo}'`;

  // Update accountstransactions table - First row
  const accountsQuery1 = `UPDATE accountstransactions SET 
  transdate = '${VoucherDate}', 
  particulars = '${companyName}', 
  debit = '${GrossAmount}', 
  credit = '0',
  fcdebit = '${GrossAmount}'` +
  (accno ? `, accno = '${accno}'` : '') + // Add this line to conditionally update accno
  ` WHERE voucherno = '${VoucherNo}' AND vouchertype = 'Sales Voucher' AND CompanyId = '${CompanyId}'`;

  // Update accountstransactions table - Second row
  const accountsQuery2 = `UPDATE accountstransactions SET 
    transdate = '${VoucherDate}', 
    particulars = 'Sales Income', 
    debit = '0', 
    credit = '${GrossAmount}',
    fccredit = '${GrossAmount}',
    accno = 'IN33'
    WHERE voucherno = '${VoucherNo}' AND  accno = 'IN33' AND CompanyId = '${CompanyId}'`;

  db.query(salesVoucherQuery, (err, salesVoucherResult) => {
    if (err) {
      console.error('Error updating data in sales_voucher table: ', err);
      res.status(500).send('Error updating data in sales_voucher table');
    } else {
      // Update the first row in accountstransactions table
      db.query(accountsQuery1, (accountsErr1, accountsResult1) => {
        if (accountsErr1) {
          console.error('Error updating data in accountstransactions (row 1): ', accountsErr1);
          res.status(500).send('Error updating data in accountstransactions (row 1)');
        } else {
          // Update the second row in accountstransactions table
          db.query(accountsQuery2, (accountsErr2, accountsResult2) => {
            if (accountsErr2) {
              console.error('Error updating data in accountstransactions (row 2): ', accountsErr2);
              res.status(500).send('Error updating data in accountstransactions (row 2)');
            } else {
              console.log('Data updated successfully in both tables');
              res.status(200).send('Data updated successfully');
            }
          });
        }
      });
      if (DeliveryNote) {
        // Update query for cust_deliverynote table
        const updateStatusQuery = `
          UPDATE cust_deliverynote
          SET status = 'delivered'
          WHERE VoucherNo = '${DeliveryNote}';
        `;
  
        // Execute the update query
        db.query(updateStatusQuery, (updateStatusErr, updateStatusResult) => {
          if (updateStatusErr) {
            console.error('Error updating delivery note status:', updateStatusErr);
            // Handle the error as needed
          } else {
            console.log('Delivery note status updated successfully');
          }
        });
      }
    }
  });
});


router.get('/getFormData/:VoucherNo', (req, res) => {
  const { VoucherNo } = req.params;
  const CompanyId = req.session.CompanyId;

  // Fetch data from sales_voucher_details and sales_voucher tables
  const voucherDetailsQuery = 'SELECT * FROM sales_voucher_details WHERE VoucherNo = ? AND CompanyId = ?';
  const voucherQuery = 'SELECT * FROM sales_voucher WHERE VoucherNo = ? AND CompanyId = ?';

  db.query(voucherDetailsQuery, [VoucherNo, CompanyId], (voucherDetailsErr, voucherDetailsResult) => {
    if (voucherDetailsErr) {
      console.error('Error fetching voucher details:', voucherDetailsErr);
      res.status(500).send('Error fetching voucher details');
      return;
    }

    db.query(voucherQuery, [VoucherNo, CompanyId], (voucherErr, voucherResult) => {
      if (voucherErr) {
        console.error('Error fetching voucher:', voucherErr);
        res.status(500).send('Error fetching voucher');
        return;
      }

      // Extract ItemId values from voucherDetailsResult
      const itemIds = voucherDetailsResult.map(item => item.ItemId);

      // Fetch Barcode and ItemName from itemmaster using subquery
      const itemMasterQuery = `
        SELECT ItemId, Barcode, ItemName
        FROM itemmaster
        WHERE ItemId IN (?)
      `;

      db.query(itemMasterQuery, [itemIds], (itemMasterErr, itemMasterResult) => {
        if (itemMasterErr) {
          console.error('Error fetching itemmaster details:', itemMasterErr);
          res.status(500).send('Error fetching itemmaster details');
          return;
        }

        // Combine data from all tables
        const formData = {
          VoucherNo,
          items: voucherDetailsResult.map(itemDetail => {
            const matchingItemMaster = itemMasterResult.find(item => item.ItemId === itemDetail.ItemId);
            return {
              ...itemDetail,
              Barcode: matchingItemMaster ? matchingItemMaster.Barcode : '',
              ItemName: matchingItemMaster ? matchingItemMaster.ItemName : '',
            };
          }),
          ...(voucherResult[0] || {}),
          CustomerDetail: `${(voucherResult[0] || {}).Customer_ID},${(voucherResult[0] || {}).CustomerName}`,
        };

        res.json(formData);
      });
    });
  });
});

router.get('/AccountsInvoice/:VoucherNo', (req, res) => {
  const { VoucherNo } = req.params;
  const CompanyId = req.session.CompanyId;
  const sql = 'SELECT * FROM accountstransactions WHERE VoucherNo = ? AND CompanyId = ?';
  db.query(sql, [VoucherNo, CompanyId], (err, result) => {
      if (err) {
          console.error('Error fetching data: ', err);
          res.status(500).send('Error fetching data');
      } else {
          console.log('Data fetched successfully');
          res.status(200).json(result);
      }
  });
});
router.get('/getDeliveryNotes/:customerId', (req, res) => {
  const { customerId } = req.params;
  const CompanyId = req.session.CompanyId;

  // Fetch data from cust_deliverynote table'
  const deliveryNoteQuery = 'SELECT * FROM cust_deliverynote WHERE Customer_ID = ? AND CompanyId = ? AND status = "pending"';

  db.query(deliveryNoteQuery, [customerId, CompanyId], (noteErr, result) => {
    if (noteErr) {
      console.error('Error fetching delivery note:', noteErr);
      res.status(500).send('Error fetching delivery note');
      
    } else {
      console.log('Data fetched successfully');
      res.status(200).json(result);
  }
  });
});
router.get('/getDeliveryNoteDetails/:VoucherNo', (req, res) => {
  const { VoucherNo } = req.params;
  const CompanyId = req.session.CompanyId;
  console.log(VoucherNo)
  // Fetch data only from cust_deliverynotedet table
  const voucherDetailsQuery = 'SELECT * FROM cust_deliverynotedet WHERE VoucherNo = ? AND CompanyId = ?';

  db.query(voucherDetailsQuery, [VoucherNo, CompanyId], (voucherDetailsErr, voucherDetailsResult) => {
    if (voucherDetailsErr) {
      console.error('Error fetching voucher details:', voucherDetailsErr);
      res.status(500).send('Error fetching voucher details');
      return;
    }

    // Form response with data from cust_deliverynotedet table only
    const itemIds = voucherDetailsResult.map(item => item.ItemId);
    if (itemIds.length === 0) {
      // If no ItemIds are found, send an empty response
      res.json({ VoucherNo, items: [] });
      return;
    }
      // Fetch Barcode and ItemName from itemmaster using subquery
      const itemMasterQuery = `
        SELECT ItemId, Barcode, ItemName
        FROM itemmaster
        WHERE ItemId IN (?)
      `;

      db.query(itemMasterQuery, [itemIds], (itemMasterErr, itemMasterResult) => {
        if (itemMasterErr) {
          console.error('Error fetching itemmaster details:', itemMasterErr);
          res.status(500).send('Error fetching itemmaster details');
          return;
        }

        // Combine data from all tables
        const formData = {
          VoucherNo,
          items: voucherDetailsResult.map(itemDetail => {
            const matchingItemMaster = itemMasterResult.find(item => item.ItemId === itemDetail.ItemId);
            return {
              ...itemDetail,
              Barcode: matchingItemMaster ? matchingItemMaster.Barcode : '',
              ItemName: matchingItemMaster ? matchingItemMaster.ItemName : '',
            };
          }),
      
        };

        res.json(formData);
      });

  });
});


// Invoice page api
// Delivernote page api
router.post('/savedeliver', (req, res) => {
  const CompanyId = req.session.CompanyId;
  console.log(CompanyId)
  const { VoucherNo, items } = req.body;


  let values = [];
  let sql = 'INSERT INTO cust_deliverynotedet (VoucherNo, ItemId, Description, UnitId, Sold_Qty, UnitPrice, GrossAmt, CompanyId) VALUES ';

  items.forEach((item, index) => {
    sql += '(?, ?, ?, ?, ?, ?, ?, ? ,?)';
    values = values.concat([VoucherNo, item.ItemId, item.Description, item.UnitId, item.Sold_Qty, item.UnitPrice, item.GrossAmt, CompanyId]);

    if (index !== items.length - 1) {
      sql += ', ';
    }
  });

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data into  cust_deliverynotedet: ', err);
      res.status(500).send('Error inserting data into  cust_deliverynotedet');
    } else {
      console.log('Data inserted successfully into  cust_deliverynotedet');
      res.status(200).send('Data inserted successfully  cust_deliverynotedet');
    }
  });
});
router.post('/savedel', (req, res) => {
  const CompanyId = req.session.CompanyId;
  console.log(CompanyId);
  const status = 'pending'
  const { CustomerDetail, VoucherDate, Duedate, VoucherNo, Refrence, GrossAmount } = req.body;
  const [customerId, companyName ,accno] = CustomerDetail.split(',');

  const query = `INSERT INTO cust_deliverynote (CustomerName, Customer_ID, VoucherDate, DueDate, VoucherNo, Refrence, GrossAmount, CompanyId ,status) 
    VALUES ('${companyName}', '${customerId}', '${VoucherDate}', '${Duedate}', '${VoucherNo}', '${Refrence}', '${GrossAmount}', '${CompanyId}','${status}')`;

  db.query(query, (err, result) => {
    if (err) {
      console.error('Error saving data to cust_deliverynote: ', err);
      res.status(500).send('Error saving data to database');
      return;
    }

    console.log('Data added successfully to cust_deliverynote table');
    res.status(200).send('Data added successfully');
  });
  
});

router.delete('/remove/:VoucherNo', (req, res) => {
  const { VoucherNo } = req.params;

  // Delete data from cust_deliverynotedet table
  const voucherDetailsQuery = 'DELETE FROM cust_deliverynotedet WHERE VoucherNo = ?';

  db.query(voucherDetailsQuery, [VoucherNo],  (voucherDetailsErr, voucherDetailsResult) => {
    if (voucherDetailsErr) {
      console.error('Error deleting data from cust_deliverynotedet:', voucherDetailsErr);
      res.status(500).send('Error deleting data from cust_deliverynotedet');
      return;
    }

    // Delete data from cust_deliverynote table
    const voucherQuery = 'DELETE FROM cust_deliverynote WHERE VoucherNo = ?';

    db.query(voucherQuery, [VoucherNo], (voucherErr, voucherResult) => {
      if (voucherErr) {
        console.error('Error deleting data from cust_deliverynote:', voucherErr);
        res.status(500).send('Error deleting data from cust_deliverynote');
        return;
      }

      console.log('Data deleted successfully from cust_deliverynote and cust_deliverynotedet tables');
      res.status(200).send('Data deleted successfully from cust_deliverynote and cust_deliverynotedet tables');
    });
  });
});


router.get('/getdeliver',verifyJwt, (req, res) => {
  const CompanyId = req.session.CompanyId;
  const sql = "SELECT V_ID, VoucherNo, VoucherDate,DueDate, CustomerName, GrossAmount, Refrence,status FROM cust_deliverynote WHERE CompanyId = ?"; 
  db.query(sql,[CompanyId], (err, data) => {
    if (err) {
      console.error('Error retrieving sales_voucher: ', err);
      res.status(500).json({ error: 'Error retrieving sales_voucher' });
    } else {
      res.status(200).json(data);
    }
  });
});
router.get('/getMaxNo', async (req, res) => {
  try {
    const nextvoucherNo = await getNextvoucherNos();
    res.json({ nextvoucherNo });
  } catch (error) {
    console.error('Error fetching max voucherno:', error);
    res.status(500).json({ error: 'Error fetching max voucherno' });
  }
});
async function getNextvoucherNos() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT MAX(CAST(SUBSTRING(VoucherNo,3) AS SIGNED)) AS maxvoucherNo FROM cust_deliverynote ';

    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error fetching max voucherno: ', err);
        reject(err);
      } else {
        let maxvoucherNo = result[0]?.maxvoucherNo || 0;
        if (maxvoucherNo === 0) {
          maxvoucherNo = 100;
        }
        const nextvoucherNo = `ID${maxvoucherNo + 1}`;

        console.log('Next voucherNo fetched successfully');
        resolve(nextvoucherNo);
      }
    });
  });
}
router.put('/update/:VoucherNo', (req, res) => {
  const { VoucherNo } = req.params;
  const { items } = req.body;
  const CompanyId = req.session.CompanyId; 

  // Get the existing items for the given VoucherNo
  const getExistingItemsSql = 'SELECT SDet_ID FROM cust_deliverynotedet WHERE VoucherNo = ? AND CompanyId = ?';
  const getExistingItemsValues = [VoucherNo, CompanyId];

  db.query(getExistingItemsSql, getExistingItemsValues, (err, existingItemsResult) => {
    if (err) {
      console.error(`Error fetching existing items for VoucherNo ${VoucherNo}: `, err);
      return res.status(500).send('Internal Server Error');
    }

    const existingSDetIDs = existingItemsResult.map((item) => item.SDet_ID);

    // Identify the SDet_IDs that need to be removed
    const itemsToRemove = existingSDetIDs.filter((existingSDetID) => !items.some((item) => item.SDet_ID === existingSDetID));

    // Remove items
    if (itemsToRemove.length > 0) {
      const removeItemsSql = `DELETE FROM cust_deliverynotedet WHERE VoucherNo = ? AND SDet_ID IN (?) AND CompanyId = ?`;
      const removeItemsValues = [VoucherNo, itemsToRemove, CompanyId];

      db.query(removeItemsSql, removeItemsValues, (removeErr, removeResult) => {
        if (removeErr) {
          console.error(`Error removing items for VoucherNo ${VoucherNo}: `, removeErr);
          return res.status(500).send('Internal Server Error');
        }

        console.log(`Removed items successfully for VoucherNo ${VoucherNo}`);
      });
    }

    // Update or insert items
   // Update or insert items
items.forEach((item, index) => {
  const { SDet_ID, ItemId, Description, Sold_Qty, UnitId, UnitPrice, GrossAmt } = item;

  const sql = SDet_ID
    ? 'UPDATE cust_deliverynotedet SET ItemId = ?, Description = ?, Sold_Qty = ?, UnitId = ?, UnitPrice = ?, GrossAmt = ? WHERE VoucherNo = ? AND SDet_ID = ? AND CompanyId = ?'
    : 'INSERT INTO cust_deliverynotedet (ItemId, Description, Sold_Qty, UnitId, UnitPrice, GrossAmt, VoucherNo, CompanyId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    
  const values = SDet_ID
    ? [ItemId, Description, Sold_Qty, UnitId, UnitPrice, GrossAmt, VoucherNo, SDet_ID, CompanyId]
    : [ItemId, Description, Sold_Qty, UnitId, UnitPrice, GrossAmt, VoucherNo, CompanyId];

  db.query(sql, values, (updateErr, result) => {
    if (updateErr) {
      console.error(`Error updating/inserting data in cust_deliverynotedet table for VoucherNo ${VoucherNo}: `, updateErr);
    } else {
      console.log(`Data updated/inserted successfully in cust_deliverynotedet table for VoucherNo ${VoucherNo}`);
    }
  });
});


    res.status(200).send('Data updated successfully in SalesVoucherDetails table');
  });
});
router.put('/updatedeliver/:VoucherNo', (req, res) => {
  const { VoucherNo } = req.params;
  const { CustomerDetail, VoucherDate, Duedate, Refrence, GrossAmount } = req.body;
  const [customerId, companyName, accno] = CustomerDetail.split(',');
  const CompanyId = req.session.CompanyId;

  // Update sales_voucher table
  const salesVoucherQuery = `
    UPDATE cust_deliverynote SET 
    CustomerName = '${companyName}', 
    Customer_ID = '${customerId}', 
    VoucherDate = '${VoucherDate}', 
    DueDate = '${Duedate}', 
    Refrence = '${Refrence}', 
    GrossAmount = '${GrossAmount}' 
    WHERE VoucherNo = '${VoucherNo}' AND CompanyId = '${CompanyId}'`;

  db.query(salesVoucherQuery, (err, salesVoucherResult) => {
    if (err) {
      console.error('Error updating data in sales_voucher table: ', err);
      res.status(500).send('Error updating data in sales_voucher table');
    } else {
      console.log('Data updated successfully in sales_voucher table');
      res.status(200).send('Data updated successfully');
    }
  });
});

router.get('/getDatadeliver/:VoucherNo', (req, res) => {
  const { VoucherNo } = req.params;
  const CompanyId = req.session.CompanyId;

  // Fetch data from sales_voucher_details and sales_voucher tables
  const voucherDetailsQuery = 'SELECT * FROM cust_deliverynotedet WHERE VoucherNo = ? AND CompanyId = ?';
  const voucherQuery = 'SELECT * FROM cust_deliverynote WHERE VoucherNo = ? AND CompanyId = ?'

  db.query(voucherDetailsQuery, [VoucherNo, CompanyId], (voucherDetailsErr, voucherDetailsResult) => {
    if (voucherDetailsErr) {
      console.error('Error fetching voucher details:', voucherDetailsErr);
      res.status(500).send('Error fetching voucher details');
      return;
    }

    db.query(voucherQuery, [VoucherNo, CompanyId], (voucherErr, voucherResult) => {
      if (voucherErr) {
        console.error('Error fetching voucher:', voucherErr);
        res.status(500).send('Error fetching voucher');
        return;
      }

      const itemIds = voucherDetailsResult.map(item => item.ItemId);

      // Fetch Barcode and ItemName from itemmaster using subquery
      const itemMasterQuery = `
        SELECT ItemId, Barcode, ItemName
        FROM itemmaster
        WHERE ItemId IN (?)
      `;

      db.query(itemMasterQuery, [itemIds], (itemMasterErr, itemMasterResult) => {
        if (itemMasterErr) {
          console.error('Error fetching itemmaster details:', itemMasterErr);
          res.status(500).send('Error fetching itemmaster details');
          return;
        }

        // Combine data from all tables
        const formData = {
          VoucherNo,
          items: voucherDetailsResult.map(itemDetail => {
            const matchingItemMaster = itemMasterResult.find(item => item.ItemId === itemDetail.ItemId);
            return {
              ...itemDetail,
              Barcode: matchingItemMaster ? matchingItemMaster.Barcode : '',
              ItemName: matchingItemMaster ? matchingItemMaster.ItemName : '',
            };
          }),
          ...(voucherResult[0] || {}),
          CustomerDetail: `${(voucherResult[0] || {}).Customer_ID},${(voucherResult[0] || {}).CustomerName}`,
        };

        res.json(formData);
      });
      
      

      
    });
  });
});
// Delivery Note page api
// Quotation api 
router.post('/savequotation', (req, res) => {
  const CompanyId = req.session.CompanyId;
  console.log(CompanyId)
  const { VoucherNo, items } = req.body;
 

  let values = [];
  let sql = 'INSERT INTO cust_quotationdet (VoucherNo, ItemId, Description, Addi_Desc, UnitId, Sold_Qty, UnitPrice, GrossAmt, CompanyId) VALUES ';

  items.forEach((item, index) => {
    sql += '(?, ?, ?, ?, ?, ?, ?, ?, ?)';
    values = values.concat([VoucherNo, item.ItemId, item.Description, item.Addi_Desc, item.UnitId, item.Sold_Qty, item.UnitPrice, item.GrossAmt, CompanyId]);

    if (index !== items.length - 1) {
      sql += ', ';
    }
  });

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data into  cust_quotationdet: ', err);
      res.status(500).send('Error inserting data into  cust_quotationdet');
    } else {
      console.log('Data inserted successfully into  cust_quotationdet');
      res.status(200).send('Data inserted successfully  cust_quotationdet');
    }
  });
});
router.post('/saveQT', (req, res) => {
  const CompanyId = req.session.CompanyId;
  console.log(CompanyId);
  
  const { CustomerDetail, VoucherDate, Duedate, VoucherNo, Refrence, GrossAmount, status ,Terms} = req.body;
  const [customerId, companyName ,accno] = CustomerDetail.split(',');

  const query = `INSERT INTO cust_quotation (CustomerName, Customer_ID, VoucherDate, DueDate, VoucherNo, Refrence, GrossAmount, CompanyId ,status ,TermsAndConditions_V) 
    VALUES ('${companyName}', '${customerId}', '${VoucherDate}', '${Duedate}', '${VoucherNo}', '${Refrence}', '${GrossAmount}', '${CompanyId}','${status}', '${Terms}')`;

  db.query(query, (err, result) => {
    if (err) {
      console.error('Error saving data to cust_quotation: ', err);
      res.status(500).send('Error saving data to database');
      return;
    }

    console.log('Data added successfully to cust_quotation table');
    res.status(200).send('Data added successfully');
  });
  
});

router.delete('/removeQT/:VoucherNo', (req, res) => {
  const { VoucherNo } = req.params;

  // Delete data from cust_quotationdet table
  const voucherDetailsQuery = 'DELETE FROM cust_quotationdet WHERE VoucherNo = ?';

  db.query(voucherDetailsQuery, [VoucherNo],  (voucherDetailsErr, voucherDetailsResult) => {
    if (voucherDetailsErr) {
      console.error('Error deleting data from cust_quotationdet:', voucherDetailsErr);
      res.status(500).send('Error deleting data from cust_quotationdet');
      return;
    }

    // Delete data from cust_quotation table
    const voucherQuery = 'DELETE FROM cust_quotation WHERE VoucherNo = ?';

    db.query(voucherQuery, [VoucherNo], (voucherErr, voucherResult) => {
      if (voucherErr) {
        console.error('Error deleting data from cust_quotation:', voucherErr);
        res.status(500).send('Error deleting data from cust_quotation');
        return;
      }

      console.log('Data deleted successfully from cust_quotation and cust_quotationdet tables');
      res.status(200).send('Data deleted successfully from cust_quotation and cust_quotationdet tables');
    });
  });
});


router.get('/getquotation',verifyJwt, (req, res) => {
  const CompanyId = req.session.CompanyId;
  const sql = "SELECT V_ID, VoucherNo, VoucherDate,DueDate, CustomerName, GrossAmount, Refrence,status FROM cust_quotation WHERE CompanyId = ?"; 
  db.query(sql,[CompanyId], (err, data) => {
    if (err) {
      console.error('Error retrieving sales_voucher: ', err);
      res.status(500).json({ error: 'Error retrieving sales_voucher' });
    } else {
      res.status(200).json(data);
    }
  });
});
router.get('/getMaxQT', async (req, res) => {
  try {
    const nextvoucherNo = await getNextQT();
    res.json({ nextvoucherNo });
  } catch (error) {
    console.error('Error fetching max voucherno:', error);
    res.status(500).json({ error: 'Error fetching max voucherno' });
  }
});
async function getNextQT() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT MAX(CAST(SUBSTRING(VoucherNo,3) AS SIGNED)) AS maxvoucherNo FROM cust_quotation ';

    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error fetching max voucherno: ', err);
        reject(err);
      } else {
        let maxvoucherNo = result[0]?.maxvoucherNo || 0;
        if (maxvoucherNo === 0) {
          maxvoucherNo = 100;
        }
        const nextvoucherNo = `QT${maxvoucherNo + 1}`;

        console.log('Next voucherNo fetched successfully');
        resolve(nextvoucherNo);
      }
    });
  });
}
router.put('/updateQT/:VoucherNo', (req, res) => {
  const { VoucherNo } = req.params;
  const { items } = req.body;
  const CompanyId = req.session.CompanyId; 

  // Get the existing items for the given VoucherNo
  const getExistingItemsSql = 'SELECT SDet_ID FROM cust_quotationdet WHERE VoucherNo = ? AND CompanyId = ?';
  const getExistingItemsValues = [VoucherNo, CompanyId];

  db.query(getExistingItemsSql, getExistingItemsValues, (err, existingItemsResult) => {
    if (err) {
      console.error(`Error fetching existing items for VoucherNo ${VoucherNo}: `, err);
      return res.status(500).send('Internal Server Error');
    }

    const existingSDetIDs = existingItemsResult.map((item) => item.SDet_ID);

    // Identify the SDet_IDs that need to be removed
    const itemsToRemove = existingSDetIDs.filter((existingSDetID) => !items.some((item) => item.SDet_ID === existingSDetID));

    // Remove items
    if (itemsToRemove.length > 0) {
      const removeItemsSql = `DELETE FROM cust_quotationdet WHERE VoucherNo = ? AND SDet_ID IN (?) AND CompanyId = ?`;
      const removeItemsValues = [VoucherNo, itemsToRemove, CompanyId];

      db.query(removeItemsSql, removeItemsValues, (removeErr, removeResult) => {
        if (removeErr) {
          console.error(`Error removing items for VoucherNo ${VoucherNo}: `, removeErr);
          return res.status(500).send('Internal Server Error');
        }

        console.log(`Removed items successfully for VoucherNo ${VoucherNo}`);
      });
    }

    // Update or insert items
   // Update or insert items
items.forEach((item, index) => {
  const { SDet_ID, ItemId, Description, Sold_Qty, Addi_Desc, UnitId, UnitPrice, GrossAmt } = item;

  const sql = SDet_ID
    ? 'UPDATE cust_quotationdet SET ItemId = ?, Description = ?, Sold_Qty = ?, Addi_Desc = ?, UnitId = ?, UnitPrice = ?, GrossAmt = ? WHERE VoucherNo = ? AND SDet_ID = ? AND CompanyId = ?'
    : 'INSERT INTO cust_quotationdet (ItemId, Description, Sold_Qty, Addi_Desc, UnitId, UnitPrice, GrossAmt, VoucherNo, CompanyId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
  const values = SDet_ID
    ? [ItemId, Description, Sold_Qty, Addi_Desc, UnitId, UnitPrice, GrossAmt, VoucherNo, SDet_ID, CompanyId]
    : [ItemId, Description, Sold_Qty, Addi_Desc, UnitId, UnitPrice, GrossAmt, VoucherNo, CompanyId];

  db.query(sql, values, (updateErr, result) => {
    if (updateErr) {
      console.error(`Error updating/inserting data in cust_quotationdet table for VoucherNo ${VoucherNo}: `, updateErr);
    } else {
      console.log(`Data updated/inserted successfully in cust_quotationdet table for VoucherNo ${VoucherNo}`);
    }
  });
});


    res.status(200).send('Data updated successfully in SalesVoucherDetails table');
  });
});
router.put('/updatequotation/:VoucherNo', (req, res) => {
  const { VoucherNo } = req.params;
  const { CustomerDetail, VoucherDate, Duedate, Refrence, GrossAmount, status ,Terms} = req.body;
  const [customerId, companyName, accno] = CustomerDetail.split(',');
  const CompanyId = req.session.CompanyId;

  // Update sales_voucher table
  const salesVoucherQuery = `
    UPDATE cust_quotation SET 
    CustomerName = '${companyName}', 
    Customer_ID = '${customerId}', 
    VoucherDate = '${VoucherDate}', 
    DueDate = '${Duedate}', 
    Refrence = '${Refrence}', 
    GrossAmount = '${GrossAmount}',
    status = '${status}',
    TermsAndConditions_V = '${Terms}'
    WHERE VoucherNo = '${VoucherNo}' AND CompanyId = '${CompanyId}'`;

  db.query(salesVoucherQuery, (err, salesVoucherResult) => {
    if (err) {
      console.error('Error updating data in sales_voucher table: ', err);
      res.status(500).send('Error updating data in sales_voucher table');
    } else {
      console.log('Data updated successfully in sales_voucher table');
      res.status(200).send('Data updated successfully');
    }
  });
});

router.get('/getDataquotation/:VoucherNo', (req, res) => {
  const { VoucherNo } = req.params;
  const CompanyId = req.session.CompanyId;

  // Fetch data from sales_voucher_details and sales_voucher tables
  const voucherDetailsQuery = 'SELECT * FROM cust_quotationdet WHERE VoucherNo = ? AND CompanyId = ?';
  const voucherQuery = 'SELECT * FROM cust_quotation WHERE VoucherNo = ? AND CompanyId = ?';

  db.query(voucherDetailsQuery, [VoucherNo, CompanyId], (voucherDetailsErr, voucherDetailsResult) => {
    if (voucherDetailsErr) {
      console.error('Error fetching voucher details:', voucherDetailsErr);
      res.status(500).send('Error fetching voucher details');
      return;
    }

    db.query(voucherQuery, [VoucherNo, CompanyId], (voucherErr, voucherResult) => {
      if (voucherErr) {
        console.error('Error fetching voucher:', voucherErr);
        res.status(500).send('Error fetching voucher');
        return;
      }

      const itemIds = voucherDetailsResult.map(item => item.ItemId);

      // Fetch Barcode and ItemName from itemmaster using subquery
      const itemMasterQuery = `
        SELECT ItemId, Barcode, ItemName
        FROM itemmaster
        WHERE ItemId IN (?)
      `;

      db.query(itemMasterQuery, [itemIds], (itemMasterErr, itemMasterResult) => {
        if (itemMasterErr) {
          console.error('Error fetching itemmaster details:', itemMasterErr);
          res.status(500).send('Error fetching itemmaster details');
          return;
        }

        // Fetch 'accno' from customer table
        const customerAccnoQuery = `
          SELECT accno
          FROM customers
          WHERE customerId = ?
        `;

        db.query(customerAccnoQuery, [(voucherResult[0] || {}).Customer_ID], (customerAccnoErr, customerAccnoResult) => {
          if (customerAccnoErr) {
            console.error('Error fetching customer accno:', customerAccnoErr);
            res.status(500).send('Error fetching customer accno');
            return;
          }

          // Combine data from all tables
          const formData = {
            VoucherNo,
            items: voucherDetailsResult.map(itemDetail => {
              const matchingItemMaster = itemMasterResult.find(item => item.ItemId === itemDetail.ItemId);
              return {
                ...itemDetail,
                Barcode: matchingItemMaster ? matchingItemMaster.Barcode : '',
                ItemName: matchingItemMaster ? matchingItemMaster.ItemName : '',
              };
            }),
            ...(voucherResult[0] || {}),
            CustomerDetail: `${(voucherResult[0] || {}).Customer_ID},${(voucherResult[0] || {}).CustomerName},${(customerAccnoResult[0] || {}).accno}`
          };

          res.json(formData);
        });
      });
    });
  });
});
                                             
// Quotation api
// Dashboard api
router.get('/getTotalGrossAmount', (req, res) => {
  const roleId = req.session.role;
  const isAdmin = roleId === 'admin';
  const companyId = isAdmin ? null : req.session.CompanyId;

  let startDate, endDate;

  // Logic to determine the date range based on the selected option
  if (req.query.selectedOption === 'thisMonth') {
    startDate = moment().startOf('month').format('YYYY-MM-DD');
    endDate = moment().endOf('month').format('YYYY-MM-DD');
  } else if (req.query.selectedOption === 'thisYear') {
    startDate = moment().startOf('year').format('YYYY-MM-DD');
    endDate = moment().endOf('year').format('YYYY-MM-DD');
  } else if (req.query.selectedOption === 'custom') {
    startDate = req.query.startDate;
    endDate = req.query.endDate;
  } else if (req.query.selectedOption === 'today') {
    startDate = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss');
    endDate = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
  } else {
    
    startDate = moment('2010-01-01').format('YYYY-MM-DD');
    endDate = moment('2100-12-31').format('YYYY-MM-DD');
  }

  const purchasesSql = isAdmin
    ? `SELECT SUM(debit) AS totalPurchases FROM accountstransactions WHERE transdate BETWEEN ? AND ? AND accno = 'AS3491' AND vouchertype = 'PURCHASE'`
    : `SELECT SUM(debit) AS totalPurchases FROM accountstransactions WHERE CompanyId = ? AND transdate BETWEEN ? AND ? AND accno = 'AS3491' AND vouchertype = 'PURCHASE'`;

  const totalGrossAmountSql = isAdmin
    ? `SELECT SUM(credit) AS totalGrossAmount FROM accountstransactions WHERE transdate BETWEEN ? AND ? AND accno = 'IN33' AND vouchertype = 'Sales'`
    : `SELECT SUM(credit) AS totalGrossAmount FROM accountstransactions WHERE CompanyId = ? AND transdate BETWEEN ? AND ? AND accno = 'IN33' AND vouchertype = 'Sales'`;

  const params = isAdmin ? [startDate, endDate] : [companyId, startDate, endDate];

  // Fetch total purchases
  db.query(purchasesSql, params, (err, purchasesResult) => {
    if (err) {
      console.error('Error retrieving total purchases: ', err);
      res.status(500).json({ error: 'Error retrieving total purchases' });
    } else {
      const totalPurchases = purchasesResult[0]?.totalPurchases || 0;

      // Fetch total gross amount
      db.query(totalGrossAmountSql, params, (err, totalGrossAmountResult) => {
        if (err) {
          console.error('Error retrieving total amount: ', err);
          res.status(500).json({ error: 'Error retrieving total amount' });
        } else {
          const totalGrossAmount = totalGrossAmountResult[0]?.totalGrossAmount || 0;

          // Check if cash RelativeNo exists
          const cashRelativeNo = 'AS11';
          const cashAccountNumbersSql = `SELECT accno FROM masteraccounts WHERE relativeno = ?`;
          const cashAccountNumbersParams = [cashRelativeNo];
          let cashBalance = 0;

          db.query(cashAccountNumbersSql, cashAccountNumbersParams, (err, cashAccountNumbersResult) => {
            if (err) {
              console.error(`Error retrieving AccNo values for RelativeNo ${cashRelativeNo}: `, err);
              res.status(500).json({ error: 'Error retrieving AccNo values for cash accounts' });
            } else {
              const cashAccNos = cashAccountNumbersResult.map((row) => row.accno);

              // Function to fetch cash balance for a specific account
              const fetchCashBalanceForAccount = (accNo, callback) => {
                const cashBalanceSql = isAdmin
                  ? `SELECT SUM(debit) AS totalDebit, SUM(credit) AS totalCredit FROM accountstransactions WHERE transdate BETWEEN ? AND ? AND accno = ?`
                  : `SELECT SUM(debit) AS totalDebit, SUM(credit) AS totalCredit FROM accountstransactions WHERE CompanyId = ? AND transdate BETWEEN ? AND ? AND accno = ?`;

                const cashBalanceParams = isAdmin ? [startDate, endDate, accNo] : [companyId, startDate, endDate, accNo];

                db.query(cashBalanceSql, cashBalanceParams, (err, result) => {
                  if (err) {
                    console.error(`Error retrieving cash balance for ${accNo}: `, err);
                    callback(err, 0); // Return 0 for this account in case of an error
                  } else {
                    const totalDebit = result[0]?.totalDebit || 0;
                    const totalCredit = result[0]?.totalCredit || 0;
                    const accountBalance = totalDebit - totalCredit;
                    callback(null, accountBalance);
                  }
                });
              };

              // Function to iterate through AccNo values and calculate the total cash balance
              const fetchTotalCashBalance = (index) => {
                if (index < cashAccNos.length) {
                  const cashAccNo = cashAccNos[index];
                  fetchCashBalanceForAccount(cashAccNo, (err, accountBalance) => {
                    if (!err) {
                      cashBalance += accountBalance;
                    }
                    fetchTotalCashBalance(index + 1);
                  });
                } else {
                  // Check if bank RelativeNo exists
                  const bankRelativeNo = 'AS10';
                  const bankAccountNumbersSql = `SELECT accno FROM masteraccounts WHERE relativeno = ?`;
                  const bankAccountNumbersParams = [bankRelativeNo];
                  let bankBalance = 0;

                  db.query(bankAccountNumbersSql, bankAccountNumbersParams, (err, bankAccountNumbersResult) => {
                    if (err) {
                      console.error(`Error retrieving AccNo values for RelativeNo ${bankRelativeNo}: `, err);
                      res.status(500).json({ error: 'Error retrieving AccNo values for bank accounts' });
                    } else {
                      const bankAccNos = bankAccountNumbersResult.map((row) => row.accno);

                      // Function to fetch bank balance for a specific account
                      const fetchBankBalanceForAccount = (accNo, callback) => {
                        const bankBalanceSql = isAdmin
                          ? `SELECT SUM(debit) AS totalDebit, SUM(credit) AS totalCredit FROM accountstransactions WHERE transdate BETWEEN ? AND ? AND accno = ?`
                          : `SELECT SUM(debit) AS totalDebit, SUM(credit) AS totalCredit FROM accountstransactions WHERE CompanyId = ? AND transdate BETWEEN ? AND ? AND accno = ?`;

                        const bankBalanceParams = isAdmin ? [startDate, endDate, accNo] : [companyId, startDate, endDate, accNo];

                        db.query(bankBalanceSql, bankBalanceParams, (err, result) => {
                          if (err) {
                            console.error(`Error retrieving bank balance for ${accNo}: `, err);
                            callback(err, 0); // Return 0 for this account in case of an error
                          } else {
                            const totalDebit = result[0]?.totalDebit || 0;
                            const totalCredit = result[0]?.totalCredit || 0;
                            const accountBalance = totalDebit - totalCredit;
                            callback(null, accountBalance);
                          }
                        });
                      };

                      // Function to iterate through bank AccNo values and calculate the total bank balance
                      const fetchTotalBankBalance = (index) => {
                        if (index < bankAccNos.length) {
                          const bankAccNo = bankAccNos[index];
                          fetchBankBalanceForAccount(bankAccNo, (err, accountBalance) => {
                            if (!err) {
                              bankBalance += accountBalance;
                            }
                            fetchTotalBankBalance(index + 1);
                          });
                        } else {
                          // All bank AccNo values processed, send the response with total cash balance, bank balance, total gross amount, and total purchases
                          res.status(200).json({ totalGrossAmount, totalPurchases, cashBalance, bankBalance });
                          console.log('Total Gross Amount:', totalGrossAmount);
                          console.log('Total Purchases:', totalPurchases);
                          console.log('Total Cash Balance:', cashBalance);
                          console.log('Total Bank Balance:', bankBalance);
                        }
                      };

                      // Start fetching bank balance for each bank AccNo
                      fetchTotalBankBalance(0);
                    }
                  });
                }
              };

              // Start fetching cash balance for each AccNo
              fetchTotalCashBalance(0);
            }
          });
        }
      });
    }
  });
});
// Dashboard api
router.get('/users', verifyJwt, (req, res) => {
  const sql = 'SELECT * FROM users WHERE role = ?';
  const role = 'user';

  db.query(sql, [role], (err, users) => {
    if (err) {
      console.error('Error fetching users: ', err);
      res.status(500).send('Error fetching users');
    } else {
      res.status(200).json(users);
    }
  });
});
router.post('/AccountTransactions',verifyJwt, (req, res) => {
   
  const { CompanyId, ...requestData } = req.body;

  // Check if CompanyId is present in the request body
  if (!CompanyId) {
    return res.status(400).send('CompanyId is required');
  }

  // Construct the SQL query
  const keys = Object.keys(requestData).join(', ');
  const values = Object.values(requestData).map(value => `'${value}'`).join(', ');

  const query = `INSERT INTO accountstransactions (${keys}, CompanyId) VALUES (${values}, '${CompanyId}')`;

  // Execute the query
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error generating accountstransactions data: ', err);
      res.status(500).send('Error generating accountstransactions data');
    } else {
      console.log('Account transactions data generated successfully');
      res.status(200).send('Account transactions data generated successfully');
    }
  });
});
router.get('/AccountTransactions', verifyJwt, (req, res) => {
  const CompanyId = req.session.CompanyId;
  console.log(CompanyId)

  
  const query = `SELECT * FROM accountstransactions WHERE CompanyId = '${CompanyId}'`;


  db.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching accountstransactions data: ', err);
      res.status(500).send('Error fetching accountstransactions data');
    } else {
      console.log('Account transactions data fetched successfully');
      res.status(200).json(result);
    }
  });
});
router.post('/StationMaster', (req, res) => {
   
  const { StationCode, ...requestData } = req.body;

  
  if (!StationCode) {
    return res.status(400).send('CompanyId is required');
  }

  // Construct the SQL query
  const keys = Object.keys(requestData).join(', ');
  const values = Object.values(requestData).map(value => `'${value}'`).join(', ');

  const query = `INSERT INTO stationmaster (${keys}, StationCode) VALUES (${values}, '${StationCode}')`;

  // Execute the query
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error generating stationmaster data: ', err);
      res.status(500).send('Error generating stationmaster data');
    } else {
      console.log('stationmaster data generated successfully');
      res.status(200).send('stationmaster data generated successfully');
    }
  });
});
router.get('/StationMaster', verifyJwt, (req, res) => {
  const StationCode = req.session.CompanyId;
  console.log(StationCode)

  
  const query = `SELECT * FROM stationmaster WHERE StationCode = '${StationCode}'`;


  db.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching stationmaster data: ', err);
      res.status(500).send('Error fetching stationmaster data');
    } else {
      console.log('stationmaster data fetched successfully');
      res.status(200).json(result);
    }
  });
});
router.post('/Stockregister', (req, res) => {
  const { requestData } = req.body;

  // Construct the SQL query with placeholders
  const keys = Object.keys(requestData).join(', ');
  const values = Object.values(requestData);
  const placeholders = values.map(() => '?').join(', ');

  const query = `INSERT INTO stock_register (${keys}) VALUES (${placeholders})`;

  // Execute the query with values as an array
  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error generating stock register data: ', err);
      res.status(500).send('Error generating stock register data');
    } else {
      console.log('stock register data generated successfully');
      res.status(200).send('stock register data generated successfully');
    }
  });
});

router.get('/Stockregister', (req, res) => {
 
  const query = 'SELECT * FROM stock_register';


  db.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching stock register data: ', err);
      res.status(500).send('Error fetching stock register data');
    } else {
      console.log('Stock register data fetched successfully');
      res.status(200).json(result);
    }
  });
});






  

module.exports = router;
