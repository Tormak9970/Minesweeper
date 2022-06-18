export default class SquareObj {
    topLeftVertex:number;
    topRightVertex:number;
    bottomRightVertex:number;
    bottomLeftVertex:number;
    id:string;
    squareType:string;
    total:number;
    greyColor:string;
    tanColor:string;
    isFlagged:boolean
    isChecked:boolean;
    constructor(topLeftVertex:number, topRightVertex:number, bottomRightVertex:number, bottomLeftVertex:number, id:string, squareType:string, greyColor:string, tanColor:string, isFlagged:boolean, isChecked:boolean, total:number){
        this.topLeftVertex = topLeftVertex;
        this.topRightVertex = topRightVertex;
        this.bottomRightVertex = bottomRightVertex;
        this.bottomLeftVertex = bottomLeftVertex;
        this.id = id;
        this.squareType = squareType;
        this.total = total;
        this.greyColor = greyColor;
        this.tanColor = tanColor;
        this.isFlagged = isFlagged;
        this.isChecked = isChecked;
    }
}