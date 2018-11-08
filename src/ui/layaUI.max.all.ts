
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class backgroundUI extends Dialog {
		public m_bk:Laya.Image;

        public static  uiView:any ={"type":"Dialog","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"var":"m_bk","top":0,"skin":"ui/bk/myself_bg2.png","sizeGrid":"10,7,13,9","right":0,"name":"bk","left":-43,"bottom":0,"alpha":0.5}},{"type":"Button","props":{"y":100,"x":100,"width":28,"stateNum":3,"skin":"btn_close.png","pivotY":0,"pivotX":0,"height":20}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.backgroundUI.uiView);

        }

    }
}
