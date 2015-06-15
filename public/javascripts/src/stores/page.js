/**
 * Created by joy on 2015/6/12.
 */
var Reflux=require("reflux");
var PageActions=require("../actions/page");
module.exports=Reflux.createStore(
    {
        listenables: [PageActions],
        init:function(){
            this.data={
                page:"cover",
                questions:[],
                answers:[],
                phone:""
            }
        },
        getInitableState:function(){
          return this.data
        },
        /*on<actionName> method will listen to jump action in PageActions*/
        onJump: function(page) {
            this.data.page = page;
            this.change()
        },
        /*emit the event and trigger all the listeners on this store, i.e. react components*/
        change: function() {
            this.trigger(this.data)
        }
    }
);

