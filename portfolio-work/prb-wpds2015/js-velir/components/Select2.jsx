import React from "react";
import $     from "jquery";


let Select2 = React.createClass({
    
    displayName: "Select2",

    propTypes: {
        onSelectChange: React.PropTypes.func,
        value: React.PropTypes.string,
        width: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string])
    },
    
    getDefaultProps: function(){
        return {
            width: "resolve"
        }
    },

    componentDidMount: function() {

        this.getSelectElement().select2({
            width: this.props.width,
            templateResult: function(option){

                // pass classes from <option> to <span> inside of .select2-results__option
                const className = (typeof(option.element) !== "undefined") ? option.element.className: "";
                let text = option.text;

                // add highlight class to search text
                const searchText = $(".select2-search__field").val();   
                text = text.replace(new RegExp(`(${searchText})`, "gi"), '<span class="highlight">$1</span>');
            
                return $(`<span class="${className}">${text}</span>`);
            }
        });

        // if select2 isn't supported, call callback (not sure if this ever happens)
        if(typeof(this.getSelectElement().data().select2) === "undefined") {
            if (typeof(this.props.onNotSupported) === "function") {
                this.props.onNotSupported();
            }
        }

        // make sure we update when select2 updates the <select>
        this.getSelectElement().change(this.handleChange);
    },

    shouldComponentUpdate: function(nextProps, nextState){
        // prevent infinate loop, only update if the value has changed
        return (this.props.value !== nextProps.value);
    },

    componentDidUpdate: function() {
        // update select2 whenever the data changes
        this.getSelectElement().trigger("change");
    },

    componentWillUnmount: function() {
        // remove select2 from the DOM
        this.getSelectElement().select2("destroy");
    },

    getSelectElement: function(){
        // the <select> element
        return $(this.refs.select.getDOMNode());
    },


    handleChange: function(e) {

        // call onSelectChange from parent
        if ( typeof(this.props.onSelectChange) === "function") {
            const value = $(e.target).val();
            this.props.onSelectChange(value);
        }
    },

    render: function() {

        return (
            <select ref="select" {...this.props}>
                {this.props.children}
            </select>
        );
    }
});

export default Select2;
