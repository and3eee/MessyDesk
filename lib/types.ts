



export interface NoteWrapped {
    id: number
    message: string;
    posX: number;
    posY:number;
    author: string;
    color:string;
    dateCreated: Date;
}


export interface UserPref {
    name: string | undefined;
    color: string | undefined;
    code: string | undefined;
  }
  