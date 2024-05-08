declare type GoogleApiBooks = {
    title: string
    subtitle: string
    authors: string[]
    publisher: string
    publishedDate: string
    description: string
    industryIdentifiers: IndustryIdentifier[]
    readingModes: ReadingModes
    pageCount: number
    printType: string
    categories: string[]
    maturityRating: string
    allowAnonLogging: boolean
    contentVersion: string
    panelizationSummary: PanelizationSummary
    imageLinks: ImageLinks
    language: string
    previewLink: string
    infoLink: string
    canonicalVolumeLink: string
}

declare type IndustryIdentifier = {
    type: string
    identifier: string
}

declare type ReadingModes = {
    text: boolean
    image: boolean
}

declare type PanelizationSummary = {
    containsEpubBubbles: boolean
    containsImageBubbles: boolean
}

declare type ImageLinks = {
    smallThumbnail?: string
    thumbnail?: string
}
