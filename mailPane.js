/*   Mail pane: Messages -- email addresses?
**
**
*/
/*
Possible bells and whistles

- Handle multpart MIME
- Display all headers option
- Customize header selection, style, message font, text style
- Editing and creation of new messages

- Also provide a IMAP dateway on client,
    with credentials in solid preferences
    with net adddreses in the URI
- Response to mid:  URLs by (a)local search and (b) IMAP query
     -- and message:<foo>   for OSX (sigh)
- Respond to email addresses by listing
   - Email conversations which involve the email address
   - All Person panes about the Person who, according to contcts,
      pane under pane like index.ttl#this handling.
- Respond to Persons for which we know the email address by the
*/

const UI = require('solid-ui')
const kb = UI.store
const $rdf = UI.rdf

const HEADERS = $rdf.Namespace('http://www.w3.org/2007/ont/httph#')
const MAIL = $rdf.Namespace('http://www.w3.org/2007/ont/mail#')

module.exports = {
  icon: UI.icons.iconBase + 'noun_480183.svg',

  name: 'mail',

  // Does the subject deserve this pane?
  label: function (subject) {
    var kb = UI.store
    if (kb.any(subject, HEADERS('from'))) {
      return 'message'
    }
    // var typeURIs = kb.findTypeURIs(subject)
    // if (ns.meeting('Cluster').uri in typeURIs) {
    //  return 'Message'
    // }
    return null
  },

  render: function (subject, dom) {
    var div = dom.createElement('div')
    div.setAttribute('style', 'border-radius: 1em; border: 0.1em solid black;')
    kb.fetcher.load(subject).then(function (xhr) {
      var fields = kb.StatementsMatching(subject).map(st => st.predicate)
      fields.sort()
      var table = div.appendChild(dom.createElement('table'))
      function header (h, fullwidth) {
        var contents = kb.anyValue(subject, HEADERS(h))
        if (contents) {
          var row = table.appendChild(dom.createElement('tr'))
          if (!fullwidth) {
            let name = row.appendChild(dom.createElement('td'))
            name.textContent = UI.utils.label(HEADERS(h)) + ':'
          }
          let value = row.appendChild(dom.createElement('td'))
          if (fullwidth) value.setAttribute('colspan', '2')
          value.setAttribute('style',
            'padding: 0.2em 0.2em; font-size:100%; border: 0.1em solid #888; white-space: pre-wrap; background-color: white;')
          value.textContent = contents
        }
      }
      header('from', true)
      header('to')
      header('subject', true)

      var contents = kb.anyValue(subject, MAIL('contents'))
      if (contents) {
        var contentArea = div.appendChild(dom.createElement('div')) // textarea?
        contentArea.setAttribute('style',
          'padding: 2em 0.7em; font-size:100%; border: 0.2em solid #888; white-space: pre-wrap;')
        contentArea.textContent = contents
      }
    })
    return div
  }
}
// ends
