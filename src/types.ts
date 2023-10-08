export interface Carousel {
    id: number;

    img_url: string;

    title: string

    content: string

}


export interface Fiction {
    id: number;

    swipers: string[]

    title: string

    content: string

    topics: string[]

    tags: string[]

    contributor_num: number

    view_num: number

    start_num: number

    author: Author;
}

export interface Author {
    id: number;

    avatar: string

    name: string

    fictions: Fiction []
}
