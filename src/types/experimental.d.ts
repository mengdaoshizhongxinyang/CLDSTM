declare interface Clipboard {
  write(content:ClipboardItem[]):Promise<void>
}
declare class ClipboardItem {
  constructor(parameters:ClipboardItemParameters) {}
}

// type ClipboardItemTypeName='text'|'image'
// type ClipboardItemTypeBase={
//   [key in ClipboardItemTypeName]:any
// }
// interface ClipboardItemType extends ClipboardItemTypeBase{
//   image:Blob
//   text:string
// }
// interface ClipboardItemTypeSub extends ClipboardItemTypeBase{
//   image:'text'
//   text:'png'|'jpg'
// }

type ClipboardItemParameters={
  [key in string]:unknown
}