(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{16:function(e,n,t){e.exports=t(39)},39:function(e,n,t){"use strict";t.r(n);var a=t(0),c=t.n(a),r=t(13),u=t.n(r),o=t(15),i=t(14),l=t(2),d=function(e){var n=e.persons,t=e.handleDelete,r=Object(a.useState)(""),u=Object(l.a)(r,2),o=u[0],i=u[1],d=n.filter(function(e){return""===o||e.name.toUpperCase().includes(o.toUpperCase())}).map(function(e){return c.a.createElement("div",{key:e.name},e.name," : ",e.number,c.a.createElement("button",{onClick:function(){return t(e.id)}},"delete"))});return c.a.createElement("div",null,c.a.createElement("h2",null,"Numbers"),c.a.createElement("div",null,"Search phonebook: ",c.a.createElement("input",{value:o,onChange:function(e){return i(e.target.value)}})),c.a.createElement("h2",null,"Search results"),d)},s=function(e){var n=e.handleSubmit,t=Object(a.useState)(""),r=Object(l.a)(t,2),u=r[0],o=r[1],i=Object(a.useState)(""),d=Object(l.a)(i,2),s=d[0],m=d[1];return c.a.createElement("form",null,c.a.createElement("div",null,"name: ",c.a.createElement("input",{value:u,onChange:function(e){return o(e.target.value)}})),c.a.createElement("div",null,"number: ",c.a.createElement("input",{value:s,onChange:function(e){return m(e.target.value)}})),c.a.createElement("div",null,c.a.createElement("button",{onClick:function(e){return n(e,u,s)},type:"submit"},"add")))},m={color:"green",fontSize:"18px",border:"2px solid green",padding:"8px",margin:"20px 0px"},f={color:"red",fontSize:"18px",border:"2px solid red",padding:"8px",margin:"20px 0px"},p=function(e){var n=e.type,t=e.message;return""===t?null:c.a.createElement("div",{style:"success"===n?m:f},t)},b=t(3),h=t.n(b),v="/api/persons",E=function(e,n){return h.a.post(v,{name:e,number:n})},g=function(){return h.a.get(v)},j=function(e){return h.a.delete("".concat(v,"/").concat(e))},O=function(e,n){return h.a.put("".concat(v,"/").concat(e),n)},w=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],r=n[1],u=Object(a.useState)(""),m=Object(l.a)(u,2),f=m[0],b=m[1],h=Object(a.useState)(""),v=Object(l.a)(h,2),w=v[0],x=v[1],S=function(e,n){var a="".concat(e.name," already exists in phonebook. replace number with ").concat(n);window.confirm(a)&&O(e._id,Object(o.a)({},e,{number:n})).then(function(n){return r(t.map(function(t){return t.id!==e.id?t:n.data}))})};return Object(a.useEffect)(function(){g().then(function(e){return r(e.data)})},[]),c.a.createElement("div",null,c.a.createElement("h2",null,"Phonebook"),c.a.createElement(p,{type:w,message:f}),c.a.createElement(s,{handleSubmit:function(e,n,a){e.preventDefault();var c=t.find(function(e){return e.name===n});console.log("Submitting!"),c?S(c,a):E(n,a).then(function(e){b("".concat(n," successfully created")),x("success"),setTimeout(function(){b(""),x("")},5e3),r(t.concat(e.data))}).catch(function(e){b("".concat(e.response.data)),x("danger"),setTimeout(function(){b(""),x("")},5e3)})}}),c.a.createElement(d,{persons:t,handleDelete:function(e){if(window.confirm("Do you want to delete user with id ".concat(e))){var n=Object(i.a)(t),a=n.findIndex(function(n){return n.id===e});j(e).then(function(e){n.splice(a,1),r(n)}).catch(function(e){b("".concat(n[a].name," has already been deleted")),x("danger"),setTimeout(function(){b(""),x("")},5e3)})}}}))};u.a.render(c.a.createElement(w,null),document.getElementById("root"))}},[[16,1,2]]]);
//# sourceMappingURL=main.e86002b5.chunk.js.map