// 同步事件

let mutations = {
  setCurProvince(state,val){
    state.curProvince = val;
  },
  setTop20Cities(state,val){
    let data = val.sort((a,b)=>{
      return b.value-a.value;
    })    
    state.top20Cities = data.slice(0,20);
  }
}

export default mutations