const merge = require('merge');

module.exports = function( db, sequelize, DataTypes ) {

	var Site = sequelize.define('site', {

		name: {
			type         : DataTypes.STRING(255),
			allowNull    : true,
			defaultValue : 'Nieuwe site',
		},

		title: {
			type         : DataTypes.STRING(255),
			allowNull    : true,
			defaultValue : 'Nieuwe site',
		},

		domain: {
			type         : DataTypes.STRING(255),
			allowNull    : false,
			defaultValue : 'demo.openstad.nl',
		},

		config: {
			type				 : DataTypes.TEXT,
			allowNull		 : false,
			defaultValue : {},
			get					 : function() {
				let value = this.getDataValue('config');
				try {
					if (typeof value == 'string') {
						value = JSON.parse(value);
					}
				} catch(err) {}
				return this.parseConfig(value);
			},
			set					 : function(value) {
				var currentconfig = this.getDataValue('config');
				try {
					if (typeof currentconfig == 'string') {	currentconfig = JSON.parse(currentconfig); }
				} catch(err) { currentconfig = {}; }
				value = value || {};
				value = merge.recursive(currentconfig, value);
				this.setDataValue('config', JSON.stringify(this.parseConfig(value)));
			}
		},

	});

	Site.scopes = function scopes() {
		return {
			defaultScope: {
			},
		};
	}

	Site.associate = function( models ) {
		this.hasMany(models.Idea);
	}

	Site.configOptions = function () {
		// definition of possible config values
		// todo: formaat gelijktrekken met sequelize defs
		// todo: je zou ook opties kunnen hebben die wel een default hebbe maar niet editable zijn? apiUrl bijv. Of misschien is die afgeleid
		return {
			allowedDomains: {
				type: 'arrayOfStrings',
				default: [
					'https://openstad-api.amsterdam.nl'
				]
			},
			basicAuth: {
				type: 'object',
				subset: {
					active: {
						type: 'boolean',
						default: false,
					},
					user: {
						type: 'string',
						default: 'openstad',
					},
					password: {
						type: 'string',
						default: 'LqKNcKC7',
					},
				}
			},
			cms: {
				type: 'object',
				subset: {
					dbName: {
						type: 'string',
						default: 'domainname-id',
					},
					url: {
						type: 'string',
						default: 'https://openstad-api.amsterdam.nl',
					},
					hostname: {
						type: 'string',
						default: 'openstad-api.amsterdam.nl',
					},
					'after-login-redirect-uri': {
						type: 'string',
						default: '/oauth/login?jwt=[[jwt]]',
					}
				}
			},
			notifications: {
				type: 'object',
				subset: {
					from: {
						type: 'string', // todo: add type email/list of emails
						default: 'EMAIL@NOT.DEFINED',
					},
					to: {
						type: 'string', // todo: add type email/list of emails
						default: 'EMAIL@NOT.DEFINED',
					},
				}
			},
			email: {
				type: 'object',
				subset: {
					siteaddress: {
						type: 'string', // todo: add type email/list of emails
						default: 'EMAIL@NOT.DEFINED',
					},
					thankyoumail: {
						type: 'object',
						subset: {
							from: {
								type: 'string', // todo: add type email/list of emails
								default: 'EMAIL@NOT.DEFINED',
							},
						}
					}
				}
			},
			'oauth': {
				type: 'object',
				subset: {
					"auth-server-url": {
						type: 'string',
					},
					"auth-client-id": {
						type: 'string',
					},
					"auth-client-secret": {
						type: 'string',
					},
					"auth-server-login-path": {
						type: 'string',
					},
					"auth-server-exchange-code-path": {
						type: 'string',
					},
					"auth-server-get-user-path": {
						type: 'string',
					},
					"auth-server-logout-path": {
						type: 'string',
					},
					"after-login-redirect-uri": {
						type: 'string',
					}
				}
			},
			ideas: {
				type: 'object',
				subset: {
					noOfColumsInList: {
						type: 'int',
						default: 4,
					}
				}
			},
			arguments: {
				type: 'object',
				subset: {
					new: {
						type: 'object',
						subset: {
							anonymous: {
								type: 'object',
								subset: {
									redirect: {
										type: 'string',
										default: null,
									},
									notAllowedMessage: {
										type: 'string',
										default: null,
									}
								}
							},
							showFields: {
								type: 'arrayOfStrings', // eh...
								default: ['zipCode', 'nickName'],
							}
						}
					}
				}
			},
			votes: {
				type: 'object',
				subset: {

					isViewable: {
						type: 'boolean',
						default: false,
					},

					isActive: {
						type: 'enum',
						values: [ null, true, false ],
						default: false,
					},

					isActiveFrom: {
						type: 'string',
						default: undefined,
					},

					isActiveTo: {
						type: 'string',
						default: undefined,
					},

					requiredUserRole: {
						type: 'string',
						default: 'member',
					},

					mustConfirm: {
						type: 'boolean',
						default: false,
					},

					withExisting: {
						type: 'enum',
						values: ['error', 'replace'],
						default: 'error',
					},

					votingType: {
						type: 'enum',
						values: ['likes', 'count', 'budgeting'],
						default: 'likes',
					},

					maxIdeas: {
						type: 'int',
						default: undefined,
					},

					minIdeas: {
						type: 'int',
						default: undefined,
					},

					minBudget: {
						type: 'int',
						default: undefined,
					},

					maxBudget: {
						type: 'int',
						default: undefined,
					},

				},
			},
		}
	}

	Site.prototype.parseConfig = function(config) {

		try {
			if (typeof config == 'string') {
				config = JSON.parse(config);
			}
		} catch(err) {
			config = {};
		}

		let options = Site.configOptions();

		config = checkValues(config, options)

		return config;

		function checkValues(value, options) {

			let newValue = {};
			Object.keys(options).forEach( key => {

				if (options[key].type == 'object' && options[key].subset) {
					let temp = checkValues(value[key] || {}, options[key].subset); // recusion
					return newValue[key] = Object.keys(temp) ? temp : undefined;
				}

				// TODO: in progress
				if (value[key]) {
					if (options[key].type && options[key].type === 'int' && parseInt(value[key]) !== value[key]) {
						throw new Error(`site.config: ${key} must be an int`);
					}
					if (options[key].type && options[key].type === 'string' && typeof value[key] !== 'string') {
						throw new Error(`site.config: ${key} must be an int`);
					}
					if (options[key].type && options[key].type === 'boolean' && typeof value[key] !== 'boolean') {
						throw new Error(`site.config: ${key} must be an boolean`);
					}
					if (options[key].type && options[key].type === 'arrayOfStrings' && !(typeof value[key] === 'object' && Array.isArray(value[key]) && !value[key].find(val => typeof val !== 'string'))) {
						throw new Error(`site.config: ${key} must be an array of strings`);
					}
					if (options[key].type && options[key].type === 'arrayOfObjects' && !(typeof value[key] === 'object' && Array.isArray(value[key]) && !value[key].find(val => typeof val !== 'object'))) {
						throw new Error(`site.config: ${key} must be an array of objects`);
					}
					if (options[key].type && options[key].type === 'enum' && options[key].values && options[key].values.indexOf(value[key]) == -1) {
						throw new Error(`site.config: ${key} has an invalid value`);
					}
					return newValue[key] = value[key];

				}

				// default?
				if (typeof options[key].default != 'undefined') {
					return newValue[key] = options[key].default
				}

				// allowNull?
				if (!newValue[key] && options[key].allowNull === false) {
					throw new Error(`site.config: $key must be defined`);
				}

			});
			// voor nu mag je er in stoppen wat je wilt; uiteindelijk moet dat zo gaan werken dat je alleen bestaande opties mag gebruiken
			// dit blok kan dan weg
			Object.keys(value).forEach( key => {
				if ( !newValue[key] ) {
					newValue[key] = value[key];
				}
			});
			return newValue;
		}

	}

	return Site;

};