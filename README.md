# solid-email
Interfacing to existing email formats and possibly protocols

A placeholder only, at the moment

In a solid world, how do you interface with the world on email?
One possibility is to cross-link between the two systems, using http: links
into solid, and mailto: mid:  (which exist) and possibly imap: (which does not exist)
as pointers into email system things.

As low-hanging fruit, to just be able to drop an email message (.eml) in your workspace
as a receipt, for examplee, and have the system do the right thing with it.
Allow you to read it, and follow links from it.

Possible functionality includes this wishlist:

- Parse MIME messages into RDF
- View an email message
  Include links to messages in thread, email addreses, etc.
-  View a mailbox (email address) as a summary of all the messages involved in that mailbox.
-  Manage email in folders on a solid server 
   (Note commonalty with playlists, photos albums, etc)

Possible future gateway work

- IMAP protocol
- POP protcol - suck mail into solid folders
- IMAP protcol - suck mail into solid folders
- View IMAP folders as virtal solid space


