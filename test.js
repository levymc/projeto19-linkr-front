import urlMetadata from 'url-metadata';


urlMetadata('https://www.npmjs.com/package/url-metadata')
.then((metadata) => {
  console.log(metadata)
  // do stuff with the metadata
},
(err) => {
  console.log(err)
})