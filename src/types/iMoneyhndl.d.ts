
import { ibuyMoney, idelMoneyItem } from "./iEvent";

export default interface iMoneyhndl {
    actions: {
        del: (e:idelMoneyItem)=>void,
        buy: (e:ibuyMoney)=>void,
    }
    
}
