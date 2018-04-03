
// Convert mime mail message to RDF
//
//  Usage:    node mail2n3js
var fs = require('fs')
var mp = require('mailparser')
var message = fs.readFileSync(process.argv[2], 'utf8')
// console.log(message);
var parser = new mp.MailParser()

parser.on('end', function () {
  console.log('# Ended!!')
  console.log(mimeToTurtle(parser.mimeTree))
})

parser.write(message, 'utf8')
parser.end()

function parseMime (kb, base, string) {
  var parser = new mp.MailParser()
  var parser = new mp.MailParser()
  parser.on('end', function () {
    console.log('# Ended!!') // does it have to be async??
    console.log(mimeToTurtle(parser.mimeTree))
  })
}

// Convert direct to RDF

var HEADERS = $rdf.Namespace('http://www.w3.org/2007/ont/httph#')
var MAIL = $rdf.Namespace('http://www.w3.org/2007/ont/mail#')
const XSD = $rdf.Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')

// kb is QuadStore
// tree is parsed MIME document
// id only when called recursively

var mimeToRDF = function (kb, base, tree, id) {
  var next = 0
  if (!id) {
    id = base + '#msg'
  }
  var i
  var subject = kb.sym(id)
  for (let i = 0; i < tree.headers.length; i++) {
    kb.add(subject, HEADERS(tree.headers[i].key), tree.headers[i].value)
  }
  if (tree.meta.contentType == 'multipart/alternative') {
      // throw new Error('mimeToRDF: multipart/alternative unimplemented - code me')
  } else if (tree.meta.contentType == 'text/plain') {
    kb.add(subject, MAIL('content'), tree.content)
    s += '\n  <' + id + '>  mail:content """' + tree.content + '""".\n\n'
  } else if (tree.meta.contentType.slice(0, 9) == 'text/html') {
    kb.add(subject, MAIL('content'), new $rdf.Literal(tree.content, XSD('XMLLiteral')))
  }
  for (let j = 0; j < tree.childNodes.length; j++) {
    let id2 = id + '_' + next++
    let s2 = kb.sym(id2)
    kb.add(subject, MAIL('part'), s2)
    s += mimeToRDF(kb, base, tree.childNodes[j], id2)
  }
}
