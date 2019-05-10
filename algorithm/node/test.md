
### 欧几里得游戏

>  一开始，黑板上写有两个不相等的正整数，两个玩家交替写数字，每一次，当前玩家都必须在板上写出任意两个板上数字的差，而且这两个数字必须是新的，也就是说，不能与板上任何一个已有的数字相同。当玩家再也写不出新数字时，他就输了。请问，你是选择先行动还是后行动呢？

>  根据九章算法中的更相减损术可知，问题可转化为求最大公约数，然后判断两个数中的最大值和最大公约数的倍数，如果是偶数则后手，否则先手

--------------------------------------------------------------------

### 带锁的门
> 在走廊上有n个带锁的门，从1到n一次编号。最初所有的门都是关着的。我们从门前一次经过n此，每一次都从1号门开始。在第i次经过时（i = 1，2．．．n）我们改变i的整数倍号锁的状态：也就是如果们是关着的，就打开它；如果门是打开的，就关上它。在最后以此经过后，那些门是打开的？那些门是关上的？有多少打开的门？

> 假设i > 2 , 当i \< 2 没有任何意义，根据提议当i时n的倍数时修改状态，抛出自身和1， 判断i公因数的个数，如果是偶数则门的状态不改变 否则改变，要想使公因数的个数为奇数则意味着存在a*a=i;即能够开方后得到正整数的i,门的状态与初始状态不同，因此门状态不同的编号的计算方法为

  var arr = [];
  var size = Math.floor(Math.sqrt(i));
  for(var i = 0 ; i <=size; i ++){
    arr.push(size*size)
  }

--------------------------------------------------------------------
