export interface Collection extends Object {
    weight?: string;
    settings?: Array<string>;
}

export const emptyCollection = {weight: '_', settings: ['_']};

//export const addSetting = (documentName:string, weightObj:Collection|undefined, settingsLen:number|undefined) => {
//    //const weights = firebase.firestore().collection('weights');
//	//weights.doc(documentName).set({ weight: weightObj.weight, settings: { ...weightObj.settings, [settingsLen]:""}})
//}
