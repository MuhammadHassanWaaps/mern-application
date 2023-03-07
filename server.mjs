import express from 'express'
import path from 'path'
const app = express()
const port = process.env.PORT || 5002
import cors from 'cors';


app.use(cors());
app.use(express.json());

let products = []

// app.get('/weather/:cityName', (req, res) => {
//   console.log('cityName', req.params.cityName);
//   res.send({
//     city: req.params.cityName,
//     temp: 72332434,
//     humidity: 45,
//     min: 23,
//     max: 55,
//     severTime: new Date().toString()
//   }
//   )
// })

app.post('/product', (req, res) => {
  const body = req.body
  if (
    !body.name
    || !body.price
    || !body.description
  ) {
    res.status(404).send({
      message: "please enter all the parameters..."
    })
    return;
  }
  console.log(body.name);
  console.log(body.price);
  console.log(body.description);

  products.push({
    id: `${new Date().getTime()}`,
    name: body.name,
    price: body.price,
    description: body.description,
  })

  res.send({
    message: "product added successfully"
  });
})

app.get('/products', (req, res) => {
  res.send({
    message: 'got all products successfully',
    data: products
  })
})
app.get('/product:id', (req, res) => {
  const id = req.params.id
  let isFounded = false
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      res.send({
        message: `Product ' ${products[i].id}'successfully`,
        data: products[i]
      })
      isFounded = true;
      break;
    }
  }
  if (isFounded === false) {
    res.status(400)
    res.send({
      message: 'product not found',
    })
  }
  return
})

app.delete('/product/:id', (req, res) => {
  const id = req.params.id
  let isFounded = false
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      products.splice(i, 1);
      isFounded = true;
      break;
    }
  }
  if (isFounded === false) {
    res.status(400)
    res.send({ message: 'products not Founded' }
    )
  }
  

})

app.put('/products:/id', (req, res) => {
  const body = res.body
  const id = req.params.id
  if (
    !body.name
    || !body.price
    || !body.desciption
  ) {
    res.status(400)
    res.send({ message: 'enter all parameters' }
    )
    return;
  }
  console.log(body.name);
  console.log(body.price);
  console.log(body.description);
  let isFounded = false
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      products[i].name = body.name
      products[i].price = body.
        products[i].description = body.description

      res.send({
        message:'products modified succesfully'
      })
      isFounded = true;
      break;
    }
  }
  if (!isFounded) {
    res.status(400)
    res.send({ message: 'products not found' }
    )
  }
  res.send('products added successfully') 
})


const __dirname = path.resolve()

app.use('/', express.static(path.join(__dirname, '/react-app/build')))
app.use('*', express.static(path.join(__dirname, '/react-app/build')))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})