import Server from './server'
let port = Number(process.env.port) || 3000
new Server().listen(port, () => {
  console.log('Server started at port ' + port)
})
