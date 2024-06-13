import React from "react";
import './table.css'

function Table(){
    return(
        <>
        <section>
            <div class="container">
                <div class="table-responsive">
                <table class="table table-bordered   table-striped" style={{marginTop:'5px'}}>
                <thead class="table__head">
                    <tr class="winner__table">
                    <th>S/N</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Location</th>
                    <th>Mobilenumber</th>
                    <th>Used</th>
                    <th>Description</th>
                    <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="winner__table">
                    <td>1</td>
                    <td>Tom</td>
                    <td>Kolkatta</td>
                    <td>26 Sept,2020</td>
                    <td>xxxxxx5288</td>
                    <th>Gold Coin <img src="https://batafestivepromo.bigcityexperience.com/assets/frontend/img/g_coin.png" class="coin"/></th>
                    </tr>

                    <tr class="winner__table">
                        <td>2</td>
                        <td>Virat Bisht</td>
                        <td>Kolkatta</td>
                        <td>27 Sept,2020</td>
                        <td>xxxxxx9688</td>
                    <th>Gold Coin <img src="https://batafestivepromo.bigcityexperience.com/assets/frontend/img/g_coin.png" class="coin"/></th>
                    </tr>

                    <tr class="winner__table">
                        <td>3</td>
                        <td>Jack</td>
                        <td>Kolkatta</td>
                        <td>28 Sept,2020</td>
                        <td>xxxxxx9197</td>
                        <th>Gold Coin <img src="https://batafestivepromo.bigcityexperience.com/assets/frontend/img/g_coin.png" class="coin"/></th>
                    </tr>
                
                    <tr class="winner__table">
                        <td>4</td>
                        <td>Garry</td>
                        <td>Ranchi</td>
                        <td>29 Sept,2020</td>
                        <td>xxxxxx0987</td>
                    <th>Gold Coin <img src="https://batafestivepromo.bigcityexperience.com/assets/frontend/img/g_coin.png" class="coin"/></th>
                    </tr>
                    
                    <tr class="winner__table">
                        <td>5</td>
                        <td>Uttam Tripura</td>
                        <td>South Tripura</td>
                        <td>1 Oct,2020</td>
                        <td>xxxxxx0976</td>
                        <th>Gold Coin <img src="https://batafestivepromo.bigcityexperience.com/assets/frontend/img/g_coin.png" class="coin"/></th>
                    </tr>
            
                </tbody>
                </table>
                </div>
            </div>
                    
        </section>
    </>
    )
}
export default Table