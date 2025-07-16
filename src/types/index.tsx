export interface Course{
      id: number,
      name: string,
      keyword:Array<string>
      price: number,
      thumb: string,
      poster:string,
      shortDescription: string,
      longDescription: string,
      averageRating:number,
      reviews: [
        {
          userId: number,
          userName:string,
          rating: number
          comment: string,
          date: string
        }
      ]
}