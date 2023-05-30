import React, { useEffect, useState } from 'react';
import '../../css/SelectMulti.css';
import { userBookService } from '../../services/userBook.services';

const BookCategories = (props) => {
    const [category, setcategory] = React.useState(props.categories.cate)
    const [categories, setCategories] = React.useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const load = async () => {
            setIsLoading(true)
            const rs = await userBookService.categories();
            if (rs) {
                setcategory(props.categories.cate)
                setCategories(rs.data)
                setIsLoading(false)
            }
        }

        load().catch(console.error)
    }, []);

    return (
        <div>
            <div className="category-item-list">
                {isLoading === false ?
                    category.map((item) => {
                        var cateName = ""
                        if (categories.find((cate) => cate.id === item)) {
                            cateName = categories.find((cate) => cate.id === item).name
                        }
                        return <span className="category-item">{cateName}</span>;
                    }) : <></>
                }
            </div>
        </div>
    );
}

export default BookCategories