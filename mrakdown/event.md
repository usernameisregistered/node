### Event

> 属性

| key | type | description | default |
| :- | :- | :- | :- |
| cancelable | boolean | 用来表示这个事件是否可以取消。 | true |
| timeStamp | date | 事件创建时的时间戳，毫秒级别 | Date.now() |
| type  | string | 事件的类型 | null | 
| once  | boolean | 表示 listener 在添加之后最多只调用一次 | false |

> 方法

| key | description |
| :- | :- |
| on | 绑定事件 |
| off | 取消绑定事件 |
| trigger | 触发事件 |
| once | 绑定事件 仅绑定一次 |