import { INode } from './INode'

export enum ContentVariety {
    normal = 0,
    hyperlink = 1,
    bad = 2,
}

export class Node implements INode {
    parentNode: INode | null = null
    childNodes: INode[] = []
    tagName: string

    chars: number | undefined
    hyperchars: number | undefined
    tags: number | undefined
    score: number | undefined
    sum: number | undefined

    variety: number = ContentVariety.normal

    constructor(tagName: string) {
        this.tagName = tagName
    }

    compute() {
        this.chars = this.hyperchars = this.sum = 0
        this.tags = 1

        this.childNodes.forEach(n => {
            n.compute()
            this.chars += n.chars as any
            this.hyperchars += n.hyperchars as any
            this.tags += n.tags as any
            this.sum += n.score as any
        })

        this.score = this.chars / this.tags * Math.log2((this.chars + 1) / (this.hyperchars + 1))

        if (this.ofVariety(ContentVariety.bad))
            this.score *= 0.1
    }

    ofVariety(variety: ContentVariety): boolean {
        return (this.variety & variety) != 0
    }

    toString() {
        const parts = this.childNodes.map(n => n.toString())
        return parts.join('')
    }
}