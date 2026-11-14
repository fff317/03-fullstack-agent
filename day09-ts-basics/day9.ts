//闭卷重写三个typescript函数
function add(a: number,b: number):number{
    return a + b;
}

function sub(a: number,b: number):number{
    return a - b;
}

function introduce(name: string,age: number):void{
    console.log("请自我介绍:");
    console.log(`我的姓名是${name},我的年龄是${age}`);
}



const result1 = add(1,2);
console.log(result1);
const result2 = sub(3,1);
console.log(result2);
introduce('小明',18);
//项目
interface Task{
    name: string;
    id: number;
    status: string;
}

function createTask(taskname: string,taskid: number,taskstatus: string,a: Task[]):Task[]{
    a.push({name: taskname,id: taskid,status: taskstatus});
    return a;
}

function findTask(taskid: number,a: Task[]):Task|null{
    for(const task of a){
        if(task.id === taskid){
            console.log(task);
            return task
        }
    }
    console.log(`未找到id为${taskid}的任务`)
    return null 
}

function filterBystatus(taskstatus: string,a: Task[]):Task[]{
    const result: Task[] = [];
    for(const task of a){
        if(task.status === taskstatus){
            result.push(task);
        }
    }
    if(result.length === 0){
        console.log(`没有找到状态为${taskstatus}的任务`);
    }
    return result;
}

const data: Task[] = [
    { id: 1, name: "写文档", status: "进行中" },
    { id: 2, name: "修 Bug", status: "已完成" },
    { id: 3, name: "开会", status: "待开始" },
];


/*传错误的类型
const taskin = FindTask("1",data);
*/

/*函数没有返回值
function CreateTask(taskname: string,taskid: number,taskstatus: string,a: Task[]):Task[]{
    a.push({name: taskname,id: taskid,status: taskstatus});
}
*/

/*对可能为null的值直接取属性
const taskName = FindTask(1,data);
console.log(taskName.status);
*/

//修改
const taskin = findTask(1,data);
function CreateTask(taskname: string,taskid: number,taskstatus: string,a: Task[]):Task[]{
    a.push({name: taskname,id: taskid,status: taskstatus});
    return a;
}
const taskName = findTask(1,data);
if(taskName != null){
    console.log(taskName.status);
}