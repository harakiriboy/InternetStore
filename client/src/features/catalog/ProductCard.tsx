import { Button, Card } from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../../app/models/product";
import './catalogstyle.css';

interface Props {
    product: Product;
}

export default function ProductCard({product}: Props) {
    return (
        <>
          <Card>
            <div className="container page-wrapper">
                <div className="page-inner">
                    <div className="row">
                    <div className="el-wrapper">
                        <div className="box-up" style={{objectFit: 'cover'}}>
                        <img className="img" style={{width: '100%'}} src={product.pictureUrl} alt=""/>
                        <div className="img-info">
                            <div className="info-inner">
                            <span className="p-name">{product.name}</span>
                            <span className="p-company">{product.brand}</span>
                            </div>
                            <div className="a-size">
                                Type : <span className="size">{product.type}</span><br /><br />
                                <Button component={Link} to={`/catalog/${product.id}`} variant="outlined">View</Button>    
                            </div>
                        </div>
                        </div>

                        <div className="box-down">
                        <div className="h-bg">
                            <div className="h-bg-inner"></div>
                        </div>

                        <div className="cart">
                            <span className="price">${(product.price / 100).toFixed(2)}</span>
                            <span className="add-to-cart">
                            <Button className="txt">Add to cart</Button>
                            </span>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </Card>
    </>
        
)}