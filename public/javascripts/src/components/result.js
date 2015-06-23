/**
 * result page is to show the result from user's selection.
 *
 * it's a static page so actually no state need to be set internally.
 * page's content is fully decided by the parameter passed in, as this.props
 *
 * Created by krystal on 6/17/15.
 */
var React = require('react/addons');


module.exports=React.createClass({
    displayName:"exports",
    getInitialState: function(){
        var body=document.getElementsByTagName("body")[0];
        var height=window.innerHeight||body.clientHeight;
        return{
            height:height,
            answer:this.props.answer
        }
    },
    render:function(){
        var image="images/"+this.state.answer.rating+"-star.png";
        return(
            <div className="wrap">
                <div>{this.state.answer.title}</div>
                <div>{this.state.answer.advice}</div>
                <img src={image}/>
            </div>
        )
    }
});