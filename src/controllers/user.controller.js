const User = require('../models/Users.js');
const Controller = require('../utils/controller');

class UserController {
	constructor() {
		this._controller = new Controller(User);
	}

	createUser = async (req, res, next) => {
		try {
			res.send(await this._controller.create(req.body));
		} catch (e) {
			next(e);
		}
	};

	deleteUserById = async (req, res, next) => {
		try {
			res.send(await this._controller.delete( req.params.id ));
		} catch (e) {
			next( e );
		}
	};

	getUserById = async (req, res, next) => {
		try {

			res.send( await this._controller.read( req.params.id, {
				password: false,
				__v: false,
			} ) );

		} catch (e) {
			next( e );
		}
	};

	updateUserById = async (req, res, next) => {
		try {
			res.send(await this._controller.update( req.params.id, req.body, {
				new: true,
			} ));
		} catch (e) {
			next( e );
		}
	};
}

module.exports = new UserController();