const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const UsuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    require: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  senha: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UsuarioSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("senha")) next();

  this.senha = await bcrypt.hash(this.senha, 8);
});

UsuarioSchema.methods = {
  compareHash(hash) {
    return bcrypt.compare(hash, this.senha);
  },

  generateToken() {
    const payload = { 
      id: this.id, 
      nome: this.nome, 
      email: this.email 
    };
    return jwt.sign(payload, "secret", {
      expiresIn: 86400
    });
  }
};

mongoose.model("Usuario", UsuarioSchema);