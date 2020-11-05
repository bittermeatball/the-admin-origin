const express = require('express')
const AWS = require('aws-sdk')
const port = 8080
const s3 = new AWS.S3({
  endpoint: 's3-us-east-2.amazonaws.com', // Put you region
  accessKeyId: 'AKXXXXXXXXXXXXXXXA6U', // Put you accessKeyId
  secretAccessKey: 'kzFHoXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXssoGp', // Put you accessKeyId
  Bucket: 'test-express-thecodeorigin', // Put your bucket name
  signatureVersion: 'v4',
  region: 'us-east-2', // Put you region
})

const app = express()
// Express 4.0+ has body-parser implemented
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Prevent CORS errors
// CORS are not detected with Postman since it's just a test app, not a browser
//
app.use((req, res, next) => {
  // Can get request from any other server (Since this is Restful API after all)
  // Replace '*' with your url only, if you want to restrict it for security
  res.header('Access-Control-Allow-Origin', '*')
  // What kind of header do you allow
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  // Server always send a OPTIONS object first
  if (req.method === 'OPTIONS') {
    res.header(
      'Access-Control-Allow-Methods',
      'PUT',
      'POST',
      'PATCH',
      'DELETE',
      'GET'
    )
    return res.status(200).json({})
  }
  // Make sure the other routes can take over
  next()
})

const getSingedUrls = async (files) => {
  try {
    const urls = await Promise.all(
      files.map(async (file) => {
        const params = {
          Bucket: 'test-express-thecodeorigin',
          Key: file.fileName,
          Expires: 60 * 5,
        }
        const url = await new Promise((resolve, reject) => {
          s3.getSignedUrl('putObject', params, (err, url) => {
            err ? reject(err) : resolve(url)
          })
        })
        return url
      })
    )
    return urls
  } catch (err) {
    if (err) {
      console.log(err)
    }
  }
}

app.get('/pre-signed-url', (req, res) => {
  console.log(req.body)
  const urls = getSingedUrls()
  res.status(200).json({
    urls,
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
