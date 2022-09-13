import { LoadingButton } from "@mui/lab";
import { Button, Card } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import { Product } from "../../app/models/product";
import './catalogstyle.css';
 
interface Props {
    product: Product;
}

export default function ProductCard({product}: Props) {
    const [loading, setLoading] = useState(false);
    const {setBasket} = useStoreContext();

    function handleAddItem(productId: number) {
        setLoading(true);
        agent.Basket.addItem(productId)
            .then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }

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
                            <LoadingButton loading={loading} onClick={() => handleAddItem(product.id)} className="txt">Add to cart</LoadingButton>
                            {/* <LoadingButton loading={loading} onClick={() => handleAddItem(product.id)}></LoadingButton> */}
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