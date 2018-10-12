//create database LibraryDB,2M容量
var MyDB = window.openDatabase('LibraryDB', '1.0', 'Manage DB', 2 * 1024 * 1024, function () {});
if(!MyDB){alert("fail to create databases!")};
var mydate=new Date();
var MyRno;
function optionDB() 
{
    //Create Tables Admin && Reader && Record
    MyDB.transaction(function (tx) 
    {
        //tx.executeSql('drop table Admin');
        tx.executeSql('CREATE TABLE Admin (id char(8) primary key,password varchar(20) not null,name varchar(10),tel char(11) unique)');
        // alert("Create Tables Success!");
    });
    MyDB.transaction(function (tx) 
    {   
        //tx.executeSql('drop table Reader');
        tx.executeSql('CREATE TABLE Reader (Rno char(8) primary key,Rpwd varchar(20) not null,Rname varchar(10),Rtel char(11) unique)');
    });
    //insert data
    MyDB.transaction(function (tx) 
    {
            tx.executeSql('insert into Admin(id,password,name,tel) values("201606","123456","Arthur","15520762063")');
            tx.executeSql('insert into Admin(id,password,name,tel) values("201607","123458","Arthur4","15520762863")');
        // alert("insert success!"); 
    });
    MyDB.transaction(function (tx) 
    {
            tx.executeSql('insert into Reader(Rno,Rpwd,Rname,Rtel) values("201706","2123456","Bliman","17856485468")');
            tx.executeSql('insert into Reader(Rno,Rpwd,Rname,Rtel) values("201506","6123456","Tulum","18745389214")');
            tx.executeSql('insert into Reader(Rno,Rpwd,Rname,Rtel) values("201306","9123456","Tony","14745329214")');
            tx.executeSql('insert into Reader(Rno,Rpwd,Rname,Rtel) values("201206","4123456","Amyli","13745489214")');

        // alert("insert success!"); 
    });
    //create table Book
    MyDB.transaction(function (tx) 
    {
        //删除上一次创建的数据表，使得数据表最新：
        //tx.executeSql('drop table Book');
        tx.executeSql('CREATE TABLE Book (Bno char(8) primary key,type char(10),title varchar(40),author varchar(20),total int,state char(10))');
    });
    MyDB.transaction(function (tx) 
    {
        tx.executeSql('insert into Book(Bno,type,title,author,total,state) values("001206","Policy","The Policy And Economics","Thmos","6","yes")');
        tx.executeSql('insert into Book(Bno,type,title,author,total,state) values("001207","Novel","A Midsummer Nights Dream","W. William Shakespeare","5","yes")');
        tx.executeSql('insert into Book(Bno,type,title,author,total,state) values("001812","Masterpiece","The Old Man and the Sea","Ernest Miller Hemingway","4","no")');
        tx.executeSql('insert into Book(Bno,type,title,author,total,state) values("001606","Papers","Pickwick Papers","Charles Dickens","6","yes")');
        tx.executeSql('insert into Book(Bno,type,title,author,total,state) values("001318","Novel","The Red and the Black","Stendhal","3","no")');
        tx.executeSql('insert into Book(Bno,type,title,author,total,state) values("001736","CS","Father Goriot","Honore de Balzac","7","yes ")');
    });
    MyDB.transaction(function (tx) 
    {
        //tx.executeSql('drop table Record');
        tx.executeSql('CREATE TABLE Record (Rno char(8),Bno char(8),BDate date,RDate date,FOREIGN KEY(Rno) REFERENCES Reader(Rno),FOREIGN KEY(Bno) REFERENCES Book(Bno))');
    });
    
}

//检查登陆是管理员还是读者，分别跳转到不同的页面
function checklogin()
{ 
    var flag=0;
    MyDB.transaction( function(query){
        //executeSql(sql语句,数组[可选],回调函数[可选],错误回调函数[可选])
        query.executeSql(
        "SELECT * FROM Admin",
        [],
        function(query,result)
        {
        for(i=0;i<result.rows.length;i++) 
        {
            //alert(result.rows.length);
        var id = result.rows.item(i).id;
        var password = result.rows.item(i).password;
        var name = result.rows.item(i).name;
        if((document.querySelector('#user_name').value==id)&&(document.querySelector('#user_pass').value==password))
        {
            flag=1;
            alert("亲爱的管理员:"+name+"欢迎回来！");
            setTimeout("javascript:location.href='ADBM.html'", 500); 
            
        }   
        }
        }, function(query,error){ alert('查询失败: '+error.message); });

            
        });
    MyDB.transaction( function(query){
        //executeSql(sql语句,数组[可选],回调函数[可选],错误回调函数[可选])
        query.executeSql(
        "SELECT * FROM Reader",
        [],
        function(query,result)
        {
        for(i=0;i<result.rows.length;i++) 
        {
        var MyRno = result.rows.item(i).Rno;
        var Rpwd = result.rows.item(i).Rpwd;
        var Rname = result.rows.item(i).Rname;
        if((document.querySelector('#user_name').value==MyRno)&&(document.querySelector('#user_pass').value==Rpwd))
        {
            flag=1;
            alert("尊敬的读者朋友:"+Rname+"欢迎回来！"); 
            setTimeout("javascript:location.href='RDBM.html'", 500);  
        }
            
        }
        if(flag==0)
        {alert("账户或密码错误，请重新输入！！！");}
        }, function(query,error){ alert('查询失败: '+error.message); });
            
        });
}

//将所有读者信息和图书信息显示在Admin界面的Book和Reader框中
function displayAB()
{
    MyDB.transaction( function(query){
        //executeSql(sql语句,数组[可选],回调函数[可选],错误回调函数[可选])
        query.executeSql(
        "SELECT * FROM Reader",
        [],
        function(query,result)
        {
        document.querySelector('#Reader').innerHTML="读者信息如下：<br/>";
        for(i=0;i<result.rows.length;i++) 
        {
            //alert(result.rows.length);
        var Rname = result.rows.item(i).Rname;
        var Rno= result.rows.item(i).Rno;
        var Rpwd= result.rows.item(i).Rpwd;
        var Rtel= result.rows.item(i).Rtel;
        document.querySelector('#Reader').innerHTML+=("<p>"+"Rno:"+" "+Rno+"; "+"Rname:"+" "+Rname+"; "+"Rpwd:"+Rpwd+"; "+"Rtel:"+" "+Rtel+"</p>");
        }
        }, function(query,error){ alert('失败: '+error.message); });

            
        });
    MyDB.transaction( function(query){
        //executeSql(sql语句,数组[可选],回调函数[可选],错误回调函数[可选])
        query.executeSql(
        "SELECT * FROM Book",
        [],
        function(query,result)
        {
        document.querySelector('#Book').innerHTML="图书信息如下：<br/>";
        for(i=0;i<result.rows.length;i++) 
        {
            // alert(result.rows.length);
        var title = result.rows.item(i).title;
        var Bno=result.rows.item(i).Bno;
        var author = result.rows.item(i).author;
        var state = result.rows.item(i).state;
        document.querySelector('#Book').innerHTML+=("Bno:"+Bno+"; "+"title:"+title+"; "+"author:"+author+"; "+"state:"+state+" "+"</br>");
        }
        }, function(query,error){ alert('失败: '+error.message); });

            
        });

}
//将图书的信息显示在读者页面的Book框中
function displayRB()
{
    MyDB.transaction( function(query){
        //executeSql(sql语句,数组[可选],回调函数[可选],错误回调函数[可选])
        query.executeSql(
        "SELECT * FROM Book",
        [],
        function(query,result)
        {
        document.querySelector('#Book').innerHTML+="图书信息如下：<br/>";
        for(i=0;i<result.rows.length;i++) 
        {
            // alert(result.rows.length);
            var title = result.rows.item(i).title;
            var Bno=result.rows.item(i).Bno;
            var author = result.rows.item(i).author;
            var state = result.rows.item(i).state;
            var type=result.rows.item(i).type;
            var total=result.rows.item(i).total;
            document.querySelector('#Book').innerHTML+=("Bno:"+Bno+"; "+"type:"+type+"; "+"title:"+title+"; "+"author:"+author+"; "+"total:"+total+"; "+"state:"+state+" "+"<br/>");
        }
        }, function(query,error){ alert('失败: '+error.message); });

            
        });  
}
//Admin的搜索框，实现搜索功能，输出到Book或者Reader框中，输入的必须是完整的书籍的Bno或者是读者的Rno
function searchADB()
{
    var flag=0;
    MyDB.transaction(function (query){
        query.executeSql(
            "SELECT * FROM Book",[],function(query,result)
            {
                for(i=0;i<result.rows.length;i++)
                {
                    //document.querySelector('#Book').innerHTML+="图书信息搜索如下：<br/>";
                    var Bno=result.rows.item(i).Bno;
                    var title=result.rows.item(i).title;
                    var author = result.rows.item(i).author;
                    var state = result.rows.item(i).state;
 
                    if(document.querySelector('#Search').value==Bno)
                    {
                        flag=1;
                        document.querySelector('#Book').innerHTML=("图书信息搜索如下：<br/>"+"Bno:"+Bno+"; "+"title:"+title+"; "+"author:"+author+"; "+"state:"+state+" "+"</br>");
                    }

                }
            },function(query,error){alert('失败'+error.message);});
    });
    MyDB.transaction(function (query){
        query.executeSql(
            "SELECT * FROM Reader",[],function(query,result)
            {
                //document.querySelector('#Reader').innerHTML+="读者信息搜索如下：<br/>";
                for(i=0;i<result.rows.length;i++)
                {
                    var Rno=result.rows.item(i).Rno;
                    var Rname=result.rows.item(i).Rname;
                    var Rpwd= result.rows.item(i).Rpwd;
                    var Rtel= result.rows.item(i).Rtel;
                    
                    if(document.querySelector('#Search').value==Rno)
                    {
                        flag=1;
                        document.querySelector('#Reader').innerHTML=("读者信息搜索如下：<br/>"+"Rno:"+" "+Rno+"; "+"Rname:"+" "+Rname+"; "+"Rpwd:"+Rpwd+"; "+"Rtel:"+" "+Rtel+"<br/>");
                    }

                }
                if(flag==0){alert("未找到Bno对应的图书信息或Rno对应的读者信息，请检查输入是否有误！");}
            },function(query,error){alert('失败'+error.message);});
    });
}
//Reader的搜索框，实现搜索功能，输出到Book框中，输入的必须是完整的图书的Bno
function searchRDB()
{
    var flag=0;
    MyDB.transaction(function (query){
        query.executeSql(
            "SELECT * FROM Book",[],function(query,result)
            {
                //document.querySelector('#Book').innerHTML+="图书信息搜索如下：<br/>";
                for(i=0;i<result.rows.length;i++)
                {
                    var title = result.rows.item(i).title;
                    var Bno=result.rows.item(i).Bno;
                    var author = result.rows.item(i).author;
                    var state = result.rows.item(i).state;
                    var type=result.rows.item(i).type;
                    var total=result.rows.item(i).total;

                    if(document.querySelector('#Search').value==Bno)
                    {
                        flag=1;
                        document.querySelector('#Book').innerHTML=("图书信息搜索如下：<br/>"+"Bno:"+Bno+"; "+"type:"+type+"; "+"title:"+title+"; "+"author:"+author+"; "+"total:"+total+"; "+"state:"+state+" "+"<br/>");
                    }

                }
                if(flag==0){alert("未找到Bno对应的图书信息，请检查输入是否有误！");}
            },function(query,error){alert('失败'+error.message);});
    });   
}
//定义管理员界面的增加或删除读者或图书的功能
//增加Rno的读者
function DBAR()
{
    var Rno=document.querySelector('#adddele').value;
    MyDB.transaction(function(query){
        query.executeSql(         
            'insert or ignore into Reader(Rno,Rpwd,Rname,Rtel) values(?,?,?,?)',
            [Rno,"2223456","KingCA","15552489828"],
            function(query,result){
                document.querySelector('#Reader').innerHTML="";
                document.querySelector('#Book').innerHTML="";
                displayAB();
            },function(query,error){alert("失败"+error.message);});
        });
}
//可以更改相应Rno的Rname值
function DBUR()
{
    var Rno=document.querySelector('#adddele').value;
    MyDB.transaction(function(query){
        query.executeSql(         
            'update Reader set Rname="Saber" where Rno=?',
            [Rno],
            function(query,result){
                document.querySelector('#Reader').innerHTML="";
                document.querySelector('#Book').innerHTML="";
                displayAB();
            },function(query,error){alert("失败"+error.message);});
        });
}
//删除Rno的读者
function DBDR()
{
    var Rno=document.querySelector('#adddele').value;
    MyDB.transaction(function(query){
        query.executeSql(
            'delete from Reader where Rno=?',
            [Rno],function(query,result){
                document.querySelector('#Reader').innerHTML="";
                document.querySelector('#Book').innerHTML="";
                displayAB();
            },function(query,error){alert("失败"+error.message);}
        );
    });
}
//增加Bno的书籍
function DBAB()
{
    var Bno=document.querySelector('#adddele').value;
    MyDB.transaction(function(query){
        query.executeSql(         
            'insert or ignore into Book(Bno,type,title,author,total,state) values(?,?,?,?,?,?)',
            [Bno,"Computer","The Algorithm And Data","AerTloya","4","yes"],
            function(query,result){
                document.querySelector('#Reader').innerHTML="";
                document.querySelector('#Book').innerHTML="";
                displayAB();
            },function(query,error){alert("失败"+error.message);});
        });
}
//修改对应的Bno的title
function DBUB()
{
    var Bno=document.querySelector('#adddele').value;
    MyDB.transaction(function(query){
        query.executeSql(         
            'update Book set title="The World is New" where Bno=?',
            [Bno],
            function(query,result){
                document.querySelector('#Reader').innerHTML="";
                document.querySelector('#Book').innerHTML="";
                displayAB();
            },function(query,error){alert("失败"+error.message);});
        });
}
//删除对应的Bno的图书
function DBDB()
{
    var Bno=document.querySelector('#adddele').value;
    MyDB.transaction(function(query){
        query.executeSql(
            'delete from Book where Bno=?',
            [Bno],function(query,result){
                document.querySelector('#Reader').innerHTML="";
                document.querySelector('#Book').innerHTML="";
                displayAB();
            },function(query,error){alert("失败"+error.message);}
        );
    });
}
//实现借还书操作
//借书操作
function DBBB()
{
    var Bno=document.querySelector('#adddele').value;
    MyDB.transaction(function(query){
        query.executeSql(
            'update Book set total=0 where Bno=?',[Bno],null,function(query,error){alert("失败"+error.message);});
        query.executeSql(
            'update Book set state="no" where Bno=?',[Bno],
            function(query,result){
                document.querySelector('#Book').innerHTML="";
                displayRB();
            },function(query,error){alert("失败"+error.message);});
        query.executeSql(
            'insert or ignore into Record(Rno,Bno,BDate,RDate) values(?,?,?,?)',["Arthur",Bno,mydate.toLocaleString(),null],null,function(query,error){alert("失败"+error.message);});
        query.executeSql(
            'select * from Record',[],function(query,result){
                document.querySelector('#Book').innerHTML+="借阅信息如下：<br/>";
                for(i=0;i<result.rows.length;i++) 
                {
                    // alert(result.rows.length);
                    var Bno2=result.rows.item(i).Bno;
                    var Rno = result.rows.item(i).Rno;
                    var BDate = result.rows.item(i).BDate;
                    var RDate=result.rows.item(i).RDate;
                    document.querySelector('#Book').innerHTML+=("Bno:"+Bno2+"; "+"Rno:"+Rno+"; "+"BDate:"+BDate+"; "+"RDate:"+RDate+" "+"<br/>");
                }

            },function(query,error){alert("失败"+error.message);});
        });
}
//还书操作
function DBRB()
{
    var Bno=document.querySelector('#adddele').value;
    MyDB.transaction(function(query){
        query.executeSql(
            'update Book set total=1 where Bno=?',[Bno],null,function(query,error){alert("失败"+error.message);});
        query.executeSql(
            'update Book set state="yes" where Bno=?',[Bno],
            function(query,result){
                document.querySelector('#Book').innerHTML="";
                displayRB();
            },function(query,error){alert("失败"+error.message);});
        query.executeSql(
            'update Record set RDate=? where Bno=?',[mydate.toLocaleString(),Bno],null,function(query,error){alert("失败"+error.message);});
        query.executeSql(
            'select * from Record',[],function(query,result){
                document.querySelector('#Book').innerHTML+="借阅信息如下：<br/>";
                for(i=0;i<result.rows.length;i++) 
                {
                    // alert(result.rows.length);
                    var Bno2=result.rows.item(i).Bno;
                    var Rno = result.rows.item(i).Rno;
                    var BDate = result.rows.item(i).BDate;
                    var RDate=result.rows.item(i).RDate;
                    document.querySelector('#Book').innerHTML+=("Bno:"+Bno2+"; "+"Rno:"+Rno+"; "+"BDate:"+BDate+"; "+"RDate:"+RDate+" "+"<br/>");
                }

            },function(query,error){alert("失败"+error.message);});
        });
}