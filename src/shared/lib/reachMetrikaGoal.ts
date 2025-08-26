export const reachMetrikaGoal = (goalName: string)=>  {
    const global = window as any;

    if (global.ym && global.ymId) {
      global.ym(global.ymId, 'reachGoal', goalName);
    }
}