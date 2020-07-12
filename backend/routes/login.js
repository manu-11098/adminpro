var express 			= require('express');
var bcrypt 				= require('bcryptjs');
var User 				= require('../models/user');
var jwt 				= require('jsonwebtoken');
const SEED 				= require('../config/config').seed;
const ID 				= require('../config/config').google_client_id;
const {
	OAuth2Client
} = require('google-auth-library');
var authentification    = require('../middlewares/authentification');
/**
 * Variables
 */
var app = express();
var client = new OAuth2Client(ID);

// Routes
async function verify(token) {
	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: ID, // Specify the CLIENT_ID of the app that accesses the backend
		// Or, if multiple clients access the backend:
		//[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
	});
	const payload = ticket.getPayload();
	// const userid = payload['sub'];
	// If request specified a G Suite domain:
	// const domain = payload['hd'];
	return {
		name: payload.name,
		email: payload.email,
		img: payload.picture,
		google: true,
		// payload
	};
}
/**
 * Google authentification
 */
app.post('/google', async (req, res, next) => {

	try {
		let googleUser = await verify(req.body.token);

		User.findOne({
				email: googleUser.email
			}).exec()
			.then(user => {
				if (!user) {
					let user = new User();
					user.name = googleUser.name;
					user.email = googleUser.email;
					user.img = googleUser.img;
					user.google = true;
					user.password = ';)';

					return user.save();
				}
				return user;
			})
			.then(user => {
				if (user.google) {
					const token = jwt.sign({
						data: user
					}, SEED, {
						expiresIn: 14400
					});
					res.status(200).json({
						ok: true,
						user: user,
						token: token, 
						menu: getMenu(user.role)
					});
				} else {
					res.status(401).json({
						ok: false,
						message: `User with email: ${user.email} can not login by google`
					})
				}
			}).catch(err => {
				res.status(500).json({
					ok: false,
					message: 'Error al buscar usuarios',
					errors: err.message
				});
			});

	} catch (error) {
		return res.status(403).json({
			ok: false,
			message: "No valid token"
		});
	}

});

/**
 * Normal authentification
 */
app.post('/', async (req, res) => {
	try {
		let user = await User.findOne({
			email: req.body.email
		}).exec();;
		if (!user) {
			res.status(500).json({
				ok: false,
				message: 'Error al buscar usuarios',
				error: `User with email: ${req.body.email} not find`
			});
		} else if (!bcrypt.compareSync(req.body.password, user.password)) {
			res.status(500).json({
				ok: false,
				message: 'Error al buscar usuarios',
				error: `User with password: ${req.body.password} not match`
			});
		} else {
			user.password = '*';
			var token = jwt.sign({
				user
			}, SEED, {
				expiresIn: 14400
			});
			res.status(200).json({
				ok: true,
				user,
				token,
				menu: getMenu(user.role)
			});
		}
	} catch (error) {
		res.status(500).json({
			ok: false,
			message: 'Error al buscar usuarios',
			error
		});
	}

});

getMenu = function (role) {
	const menu = [{
			title: 'Principal',
			icon: 'mdi mdi-gauge',
			submenu: [{
					title: 'Dashboard',
					url: '/dashboard'
				},
				{
					title: 'Progress',
					url: '/progress'
				},
				{
					title: 'Graphics',
					url: '/graphics1'
				},
				{
					title: 'Promises',
					url: '/promises'
				},
				{
					title: 'RxJs',
					url: '/rxjs'
				},
			]
		},
		{
			title: 'Mantenimientos',
			icon: 'mdi mdi-folder-lock-open',
			submenu: [
				// { title: 'Usuarios', url: '/user' },
				{
					title: 'Hospitales',
					url: '/hospital'
				},
				{
					title: 'Medicos',
					url: '/doctor'
				},
			]
		}
	];

	if (role === 'ADMIN_ROLE')
		menu[1].submenu.unshift({ title: 'Usuarios', url: '/user' })

	return menu;
};

app.get('/renew', authentification.verify ,(req, res) => {
	const token = jwt.sign( { data: req.user }, SEED, { expiresIn: 14400 });
	res.status(200).json({
		ok: true,
		token
	});
});

module.exports = app;