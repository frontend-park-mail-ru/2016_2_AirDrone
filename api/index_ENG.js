module.exports = {
    "swagger": "2.0",
    "info": {
        "title": "AirControl API",
        "description": "Control your Quadcopter with AirControl API",
        "version": "1.0.0"
    },
    "host": "api.copterapi.com",
    "schemes": [
                "https"
                ],
    "basePath": "/v1",
    "produces": [
                 "application/json"
                 ],
    "paths": {
        "/user": {
            "get": {
                "summary": "Get user's info",
                "description": "",
                "parameters": [
                               {
                               "name": "sessionID",
                               "in": "query",
                               "description": "ID of current session",
                               "required": true,
                               "type": "string"
                               }
                               ],
                "tags": [
                         "Users"
                         ],
                "responses": {
                    "200": {
                        "description": "User's info",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/User"
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
                         "Users"
                         ],
                "summary": "Add new User",
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
                               "description": "User object that needs to be added to the Data Base",
                               "required": true,
                               "schema": {
                               "$ref": "#/definitions/User"
                               }
                               }
                               ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Session"
                            }
                        }
                    },
                    "405": {
                        "description": "Invalid input"
                    }
                }
            },
            "delete": {
                "tags": [
                         "Users"
                         ],
                "summary": "Add new User",
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
                               "description": "User object that needs to deleted from the Data Base",
                               "required": true,
                               "schema": {
                               "$ref": "#/definitions/DeleteUser"
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
                         "Users"
                         ],
                "summary": "Set User's data",
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
                               "description": "ID of user's session to change his data",
                               "required": true,
                               "schema": {
                               "$ref": "#/definitions/Session"
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
            "get": {
                "summary": "Get session for user",
                "description": "",
                "tags": [
                         "Session"
                         ],
                "responses": {
                    "200": {
                        "description": "Current session ID",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Session"
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
                         "Session"
                         ],
                "summary": "User login method",
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
                               "description": "User object that needs to be added to the Data Base",
                               "required": true,
                               "schema": {
                               "$ref": "#/definitions/User"
                               }
                               }
                               ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Session"
                            }
                        }
                    },
                    "405": {
                        "description": "Invalid input"
                    }
                }
            },
            "delete": {
                "tags": [
                         "Session"
                         ],
                "summary": "User login method",
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
                               "description": "User object that needs to be added to the Data Base",
                               "required": true,
                               "schema": {
                               "$ref": "#/definitions/Session"
                               }
                               }
                               ],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "400": {
                        "description": "Bad request"
                    }
                }
            }
        }
    },
    "definitions": {
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
        "Session": {
            "type": "object",
            "properties": {
                "sessionID": {
                    "type": "string"
                }
            }
        },
        "DeleteUser": {
            "type": "object",
            "properties": {
                "password": {
                    "type": "string"
                },
                "email": {
                    "type": "string"
                },
                "sessionID": {
                    "type": "string"
                }
            }
        }
    }
}