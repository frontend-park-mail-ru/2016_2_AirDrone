module.exports = {
    "swagger": "2.0",
    "info": {
        "title": "AirControl API",
        "description": "Призван дать возможность управлять Вашим квадрокоптером через интернет",
        "version": "1.0.0"
    },
    "host": "air-drone.herokuapp.com",
    "schemes": [
                "https"
                ],
    "basePath": "/",
    "produces": [
                 "application/json"
                 ],
    "paths": {
        "/user": {
            "get": {
                "summary": "Информация о пользователе",
                "description": "Выдает информацию о залогиненном пользователе",
                "tags": [
                         "Пользователь"
                         ],
                "responses": {
                    "200": {
                        "description": "Пользовательская информация",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/EmailUsername"
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized"
                    }
                }
            },
            "post": {
                "tags": [
                         "Пользователь"
                         ],
                "summary": "Добавление нового пользователя",
                "description": "",
                "consumes": [
                             "application/json"
                             ],
                "produces": [
                             "application/json"
                             ],
                "parameters": [
                               {
                               "in": "body",
                               "name": "body",
                               "description": "Отправка на сервер даннх о новом пользователе, которого нужно внести в Базу Данных",
                               "required": true,
                               "schema": {
                               "$ref": "#/definitions/User"
                               }
                               }
                               ],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "400": {
                        "description": "Bad Request"
                    },
                    "403": {
                        "description": "Forbidden"
                    }
                }
            },
            "delete": {
                "tags": [
                         "Пользователь"
                         ],
                "summary": "Удаление пользователя",
                "description": "Удаление пользователя из Базы Данных. Подтверждается вводом логина и пароля на клиентской стороне.",
                "consumes": [
                             "application/json"
                             ],
                "produces": [
                             "application/json"
                             ],
                "parameters": [
                               {
                               "in": "body",
                               "name": "body",
                               "description": "Объект пользователя",
                               "required": true,
                               "schema": {
                               "$ref": "#/definitions/LoginPassword"
                               }
                               }
                               ],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "403": {
                        "description": "Forbidden"
                    }
                }
            },
            "put": {
                "tags": [
                         "Пользователь"
                         ],
                "summary": "Изменение пользовательских данных",
                "description": "",
                "consumes": [
                             "application/json"
                             ],
                "produces": [
                             "application/json"
                             ],
                "parameters": [
                               {
                               "in": "body",
                               "name": "body",
                               "description": "Объект с новыми и старыми данными пользователя",
                               "required": true,
                               "schema": {
                               "$ref": "#/definitions/PutUserRequest"
                               }
                               }
                               ],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "403": {
                        "description": "Forbidden"
                    }
                }
            }
        },
        "/session": {
            "post": {
                "tags": [
                         "Сессия"
                         ],
                "summary": "Метод авторизации",
                "description": "",
                "consumes": [
                             "application/json"
                             ],
                "produces": [
                             "application/json"
                             ],
                "parameters": [
                               {
                               "in": "body",
                               "name": "body",
                               "description": "Объект пользователя для авторизации",
                               "required": true,
                               "schema": {
                               "$ref": "#/definitions/LoginPassword"
                               }
                               }
                               ],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "400": {
                        "description": "Bad Request"
                    },
                    "403": {
                        "description": "Forbidden"
                    }
                }
            },
            "delete": {
                "tags": [
                         "Сессия"
                         ],
                "summary": "Очистка сессии",
                "description": "Метод для выхода пользователя из системы",
                "consumes": [
                             "application/json"
                             ],
                "produces": [
                             "application/json"
                             ],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "401": {
                        "description": "Unauthorized"
                    }
                }
            }
        }
    },
    "definitions": {
        "LoginPassword": {
            "type": "object",
            "properties": {
                "password": {
                    "type": "string"
                },
                "email": {
                    "type": "string"
                }
            }
        },
        "User": {
            "type": "object",
            "properties": {
                "username": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                },
                "email": {
                    "type": "string"
                }
            }
        },
        "EmailUsername": {
            "type": "object",
            "properties": {
                "email": {
                    "type": "string"
                },
                "username": {
                    "type": "string"
                }
            }
        },
        "PutUserRequest": {
            "type": "object",
            "properties": {
                "username": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                },
                "newPassword": {
                    "type": "string"
                },
                "email": {
                    "type": "string"
                }
            }
        }
    }
}
