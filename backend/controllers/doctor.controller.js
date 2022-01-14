var Doctor = require('../models/doctor');
var authentification = require('../middlewares/authentification');
var verify = authentification.verify;

class DoctorController {
   static get = async (req, res) => {
      let from = Number(req.query.from) || 0;
      Doctor.find({})
         .skip(from)
         .limit(5)
         .populate('user', 'name email')
         .populate('hospital')
         .exec()
         .then(doctors => {
            Doctor.count({})
               .exec()
               .then(count => res.status(200).json({ ok: true, doctors, count }))
         })
         .catch(errors => res.status(500).json({ ok: false, message: 'Error en la base de datos', errors }));

   }
}

module.exports = DoctorController