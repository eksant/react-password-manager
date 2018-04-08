import React, { Component } from 'react';

class Dashboard extends Component {

  render() {
    return (
      <div className="animated fadeIn">
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-3">Welcome to Passportal</h1>
            <p className="lead">Passportal is well-loved and well-regarded for offering a powerful and secure password manager and digital wallet in a really sharp-looking package that shines on every platform it runs on. It’s flexible, easy to use, works seamlessly in just about every web browser, and packs in the same features that you’ve come to expect from a premium password manager and secure document storage tool. Passportal looks great, comes with a strong password generator to help you pick good passwords every time you change one, secure notes for other passwords or notes that you want to keep private, a digital wallet for bank accounts and payment info, and a password “recipe” builder that lets you customize your passwords to your demands instead of just accepting whatever algorithm the password generator spits out at you. Recently Passportal moved from a one-time purchase to a subscription based business model ($2.99 per month for an individual account, $4.99 per month for a family account supporting five people), and is now storing your encrypted password vault in its own cloud storage service. While it may be inconvenient for users who would prefer to locally store their files, according to engineers at Passportal’s company AgileBits, it’s more secure than syncing data with third-party storage options like iCloud and Dropbox. Older Passportal users can still use their cloud-synced vaults. If you’re desperate for local vault storage, the company hasn’t disabled it completely, and you can send them an email to discuss different vault storage options with a Passportal member.</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard;
