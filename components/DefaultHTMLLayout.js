'use strict';
var React = require('react');
var ApplicationStore = require('../stores/ApplicationStore');

class DefaultHTMLLayout extends React.Component {
    render() {
        return (
            <html>
            <head>
                <meta charSet="utf-8" />
                <title>{this.props.context.getStore(ApplicationStore).getPageTitle()}</title>
                <meta name="viewport" content="width=device-width, user-scalable=no" />
                <link href="/bower_components/semantic/dist/semantic.min.css" rel="stylesheet" type="text/css" />
                <link href="/bower_components/animate.css/animate.min.css" rel="stylesheet" type="text/css" />
                <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?v=3.exp"></script>
            </head>
            <body>
                <div id="app" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
                <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/es5-shim/4.5.7/es5-shim.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/es5-shim/4.5.7/es5-sham.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/json3/3.3.2/json3.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/es6-shim/0.34.2/es6-shim.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/es6-shim/0.34.2/es6-sham.min.js"></script>
                <script src="/bower_components/jquery/dist/jquery.min.js"></script>
                <script src="/bower_components/semantic/dist/components/transition.min.js"></script>
                <script src="/bower_components/semantic/dist/components/popup.min.js"></script>
                <script src="/bower_components/semantic/dist/components/dropdown.min.js"></script>
                <script src="/bower_components/semantic/dist/components/checkbox.min.js"></script>
                <script src="/bower_components/semantic/dist/components/dimmer.min.js"></script>
                <script src="/bower_components/semantic/dist/components/modal.min.js"></script>
                <script src={'/public/js/' + this.props.clientFile}>></script>
            </body>
            </html>
        );
    }
}

module.exports = DefaultHTMLLayout;
