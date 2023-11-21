import React, { useState, useEffect } from "react";
import axios from "axios";
import {  useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const [version, setVersion] = useState("");
  const [product, setProduct] = useState("");
  const [stock, setQty] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    getProductById();
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/products/${id}`, {
        versionId: version,
        productName: product,
        qty: stock,
      });
      navigate("/product"); 
    } catch (error) {
      console.log(error);
    }
  };

  const getProductById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/products/${id}`);
      console.log('Response from getProductById:', response.data);
  
      setVersion(response.data.versionId);
      setProduct(response.data.productName);
      setQty(response.data.qty);
    } catch (error) {
      console.error('Error in getProductById:', error);
    }
  };
  
  return (
    <div>
          <div className="columns mt-5 is-centered">
            <div className="column is-half">
              <form onSubmit={handleEdit}>
                <div className="mb-4">
                  <label
                    className="block text-black text-sm font-bold mb-2"
                    htmlFor="version"
                  >
                    Version
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black bg-white leading-tight focus:outline-none focus:shadow-outline"
                    id="version"
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                  >
                    <option value="" disabled selected></option>
                    <option value="1">Playstation 1</option>
                    <option value="2">Playstation 2</option>
                    <option value="3">Playstation 3</option>
                    <option value="4">Playstation 4</option>
                    <option value="5">Playstation 5</option>
                  </select>
                </div>
                <div className="field">
                  <label className="label">Product</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={product}
                      onChange={(e) => setProduct(e.target.value)}
                      placeholder="Product"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Qty</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={stock}
                      onChange={(e) => setQty(e.target.value)}
                      placeholder="Qty"
                    />
                  </div>
                </div>
                <div className="field">
                  <button type="submit" className="button is-success">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
  );
};

export default EditProduct;
