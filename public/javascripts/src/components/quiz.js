/**
 * Created by joy on 2015/6/13.
 */
var React = require('react/addons');
var Reflux = require('reflux');
var PageActions = require('../actions/page');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var quiz=React.createClass({
    displayName:"exports",
    getInitialState: function(){
        var questions=this.props.questions.filter(function(q){
              return !q.hidden;
        });
        var body=document.getElementsByTagName("body")[0];
        var height=window.innerHeight||body.clientHeight;
        return{
            height:height,
            currentid:0,
            currentno:0,
            questions:[this.props.questions[0]],
            answers:[]
        }
    },
    onAnswer:function(answer,question,e){
        e.preventDefault();
        question.branches=question.branches.map(function(a){
            if(a.title==answer.title)
                a.choose=true;
            else
                a.choose=false;
            return a;
        }) ;
        this.setState({
           questions:[question]
        });
        setTimeout(function(){
           var next=answer.next;
            var questions=this.state.questions;
            var answers=this.state.answers;
            answers.push({
                answer:answer.title,
                qid:question.id
            });
            if(!next)
                return PageActions.finishQuestion(answers);
            questions.pop();
            questions.push(this.props.questions[next-1]);/*question's id  starts from 1*/
            this.setState({
                currentid:next,
                questions:questions,
                answers:answers
            });
            setTimeout(function(){
               document.body.scrollTop=0;
            });
        }.bind(this),500);
    },
    render:function(){
        var enableLeaveTransition=true;
        var self=this;
        return(
            <div className="wrap">
                <ReactCSSTransitionGroup transitionName="question" transitionLeave={enableLeaveTransition}>
                {
                    self.state.questions.map(function(question){

                        var tableClassName="table01";
                        return(
                            <div className="main clouds Qlist question-fix" key={self.state.currentid} style={{"min-height": self.state.height}}>
                                <h3 className="h3">
                                    <img src="images/textbox_3.png" className="textbox_3"/>
                                    <p>{question.title}</p>
                                </h3>
                                <div className={tableClassName}>
                                    <div className="table01-cont">
                                        <table>
                                            <tbody>
                                                {
                                                    question.branches.map(function(answer,index){
                                                        var className="text02";
                                                        var image="images/textbox_2.png";
                                                        if(answer.choose){
                                                            className+="cur";
                                                            image="images/textbox_2_cur.png";
                                                        }
                                                        return(
                                                            <tr key={index}>
                                                                <td>
                                                                    <div className={className} onClick={self.onAnswer.bind(this,answer,question)}>
                                                                        <img src={image} className="textbox_2"/>
                                                                        <div className="text02-in">
                                                                            <b>{answer.title}</b>
                                                                            <p>{answer.content}</p>
                                                                            <img src={answer.image}/>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        )
                    })
                }
                </ReactCSSTransitionGroup>
            </div>
        )
    }
});
module.exports=quiz;
