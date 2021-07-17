
import firebase from '../components/firebase';
export interface Collection {
    weight?: string;
    settings?: Array<string>;
}
export const setStateFromFirebase = (
    setFunc: React.Dispatch<React.SetStateAction<Collection | undefined>>,
    documentName: string,
) => {
    const weights = firebase.firestore().collection('weights');
    weights
        .doc(documentName)
        .get()
        .then((doc) => {
            doc.exists && setFunc(doc.data());
        })
        .catch((error) => {
            console.error('Error getting document:', error);
		});
	weights.doc(documentName)
    .onSnapshot((doc) => {
        setFunc(doc.data());
    });
};

//export const addSetting = (documentName:string, weightObj:Collection|undefined, settingsLen:number|undefined) => {
//    //const weights = firebase.firestore().collection('weights');
//	//weights.doc(documentName).set({ weight: weightObj.weight, settings: { ...weightObj.settings, [settingsLen]:""}})
//}
export const changeWeight = (documentName:string, weightObj:Collection|undefined) => {
    const weights = firebase.firestore().collection('weights');
	weightObj && weights.doc(documentName).set(weightObj)
}