export interface IProducts {
  id?: number,
  title: string,
  price: number,
  image?: string,
  configure: IProductConfig
}

export interface IProductConfig {
  chip: string,
  SSD: string,
  memory: string,
  display: string;
}