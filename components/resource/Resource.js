import React from 'react';
import PropertyReactor from '../reactors/PropertyReactor';
import {NavLink} from 'fluxible-router';
import URIUtil from '../utils/URIUtil';
class Resource extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        //scroll to top of the page
        if(this.props.config && this.props.config.readOnly){
            let body = $("html, body");
            body.stop().animate({scrollTop:0}, '500', 'swing', function() {
            });
        }
    }
    includesProperty(list, resource, property) {
        let out = false;
        list.forEach(function(el) {
            if (el.r === resource && el.p === property){
                out = true;
                return out;
            }
        });
        return out;
    }
    checkAccess(user, graph, resource, property) {
        //disable write access overall
        return {access: false};
    }
    render() {
        let readOnly = 1;
        let user = this.context.getUser();
        let self = this;
        let titleDIV, descDIV, keywordDIV, pageDIV, useCaseDIV, accessLevel, isWriteable, configReadOnly;
        if(self.props.readOnly !== 'undefined'){
            readOnly = self.props.readOnly;
        }else{
            //check the config for resource
            if(self.props.config && self.props.config.readOnly !== 'undefined'){
                readOnly = self.props.config.readOnly;
            }
        }
        //create a list of properties
        let list = this.props.properties.map(function(node, index) {
            //if there was no config at all or it is hidden, do not render the property
            if(!node.config || !node.config.isHidden){
                //for readOnly, we first check the defautl value then we check readOnly value of each property if exists
                //this is what comes from the config
                if(readOnly){
                    configReadOnly = true;
                }else{
                    //it property is readOnly from config
                    if(node.config){
                        if(node.config.readOnly){
                            configReadOnly = true;
                        }else{
                            //check access levels
                            accessLevel = self.checkAccess(user, self.props.graphName, self.props.resource, node.propertyURI);
                            if(accessLevel.access){
                                configReadOnly = false;
                            }else{
                                configReadOnly = true;
                            }
                        }
                    }else{
                        //check access levels
                        accessLevel = self.checkAccess(user, self.props.graphName, self.props.resource, node.propertyURI);
                        if(accessLevel.access){
                            configReadOnly = false;
                        }else{
                            configReadOnly = true;
                        }
                    }
                }
                if(node.propertyURI === 'http://purl.org/dc/terms/title'){
                    titleDIV = <PropertyReactor key={index} enableAuthentication={self.props.enableAuthentication} spec={node} readOnly={configReadOnly} config={node.config} graphName={self.props.graphName} resource={self.props.resource} property={node.propertyURI} propertyPath= {self.props.propertyPath}/>
                }else if (node.propertyURI === 'http://purl.org/dc/terms/description'){
                    descDIV = <PropertyReactor key={index} enableAuthentication={self.props.enableAuthentication} spec={node} readOnly={configReadOnly} config={node.config} graphName={self.props.graphName} resource={self.props.resource} property={node.propertyURI} propertyPath= {self.props.propertyPath}/>
                }else if (node.propertyURI === 'http://rdf.risis.eu/metadata/useCase'){
                    useCaseDIV = <PropertyReactor key={index} enableAuthentication={self.props.enableAuthentication} spec={node} readOnly={configReadOnly} config={node.config} graphName={self.props.graphName} resource={self.props.resource} property={node.propertyURI} propertyPath= {self.props.propertyPath}/>
                }else if (node.propertyURI === 'http://xmlns.com/foaf/0.1/page'){
                    pageDIV = <PropertyReactor key={index} enableAuthentication={self.props.enableAuthentication} spec={node} readOnly={configReadOnly} config={node.config} graphName={self.props.graphName} resource={self.props.resource} property={node.propertyURI} propertyPath= {self.props.propertyPath}/>
                } else if(node.propertyURI === 'http://purl.org/dc/terms/subject'){
                    keywordDIV = <PropertyReactor key={index} enableAuthentication={self.props.enableAuthentication} spec={node} readOnly={configReadOnly} config={node.config} graphName={self.props.graphName} resource={self.props.resource} property={node.propertyURI} propertyPath= {self.props.propertyPath}/>
                }else{
                    return (
                        <PropertyReactor key={index} enableAuthentication={self.props.enableAuthentication} spec={node} readOnly={configReadOnly} config={node.config} graphName={self.props.graphName} resource={self.props.resource} property={node.propertyURI} propertyPath= {self.props.propertyPath}/>
                    );
                }
            }
        });
        let currentCategory, mainDIV, tabsDIV, tabsContentDIV;
        //categorize properties in different tabs
        if(this.props.config.usePropertyCategories){
            currentCategory = this.props.currentCategory;
            if(!currentCategory){
                currentCategory = this.props.config.propertyCategories[0];
            }
            const changeTab = {'overview': 'Overview', 'people': 'People', 'date': 'Date', 'legalAspects': 'Legal Aspects', 'access': 'Access/Visit', 'technicalAspects': 'Technical Aspects', 'structuralAspects': 'Content/Structural Aspects'};
            tabsDIV = this.props.config.propertyCategories.map(function(node, index) {
                return (
                    <NavLink className={(node === currentCategory ? 'item link active' : 'item link')} key={index} routeName="resource" href={'/dataset/' + encodeURIComponent(self.props.graphName) + '/resource/' + encodeURIComponent(self.props.resource) + '/' + node + '/' + encodeURIComponent(self.props.propertyPath)}>
                      {(changeTab[node] ? changeTab[node] : node) }
                    </NavLink>
                );
            });
            tabsContentDIV = this.props.config.propertyCategories.map(function(node, index) {
                return (
                    <div key={index} className={(node === currentCategory ? 'ui bottom attached tab segment active' : 'ui bottom attached tab segment')}>
                        <div className="ui grid">
                            <div className="column ui list">
                                {titleDIV}
                                {descDIV}
                                {keywordDIV}
                                {useCaseDIV}
                                {pageDIV}
                                {(node === currentCategory ? list : '')}
                            </div>
                        </div>
                    </div>
                );
            });
            mainDIV = <div>
                        <div className="ui top attached tabular menu">
                            {tabsDIV}
                        </div>
                        {tabsContentDIV}
                      </div>;
        }else{
            mainDIV = <div className="ui segment">
                            <div className="ui grid">
                                <div className="column ui list">
                                    {titleDIV}
                                    {descDIV}
                                    {keywordDIV}
                                    {useCaseDIV}
                                    {pageDIV}
                                    {list}
                                </div>
                            </div>
                      </div>;
        }
        let breadcrumb;
        if(self.props.propertyPath.length > 1){
            breadcrumb = <div className="ui large breadcrumb">
                          <a className="section" href={'/dataset/' + encodeURIComponent(self.props.graphName) + '/resource/' + encodeURIComponent(self.props.propertyPath[0])}>{self.props.propertyPath[0]}</a>
                          <i className="right chevron icon divider"></i>
                          <div className="active section">{URIUtil.getURILabel(self.props.propertyPath[1])}</div>
                        </div>;
        }
        return (
            <div className="ui page grid" ref="resource" itemScope itemType={this.props.resourceType} itemID={this.props.resource}>
                <div className="ui column">
                    {breadcrumb}
                    <h2>
                        {this.props.isComplete ? '' : <img src="/assets/img/loader.gif" alt="loading..."/>}
                        <a target="_blank" href={'/export/NTriples/' + encodeURIComponent(this.props.graphName) + '/' + encodeURIComponent(this.props.resource)}><i className="blue icon cube"></i></a> <a href={this.props.resource} target="_blank">{this.props.title}</a>
                    </h2>
                    {mainDIV}
                </div>
            </div>
        );
    }
}
Resource.contextTypes = {
    getUser: React.PropTypes.func
};
export default Resource;
