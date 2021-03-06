module.exports = {
  development: {
    isProduction: false,
    port: 3001,
    apiPort: 3030,
    app: {
      name: 'Reboo Nossas Cidades Development'
    }
  },
  production: {
    isProduction: true,
    port: process.env.PORT,
    apiPort: 3030,
    app: {
      name: 'Reboo Nossas Cidades Production'
    }
  }
}[process.env.NODE_ENV || 'development'];
