import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

type Product = {
    seq: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
};

const MainPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        // 상품 목록 불러오기
        axios.get('/api/products')
            .then((res) => {
                if (Array.isArray(res.data)) {
                    setProducts(res.data);
                } else if (Array.isArray(res.data.products)) {
                    setProducts(res.data.products);
                } else {
                    console.error("예상하지 못한 데이터 구조", res.data);
                }
            })
            .catch((err) => console.error('상품을 불러오는 중 오류 발생', err));
    }, []);

    const goToDetail = (seq: number) => {
        navigate(`/product/${seq}`);
    };

    const addToCart = (seq: number) => {
        axios.post(`/api/cart`, {productId: seq})
            .then(() => alert('선택한 상품이 장바구니에 담겼습니다!'))
            .catch((err) => console.error('오류가 발생하여 장바구니에 담지 못하였습니다.', err));
    };

  return (
      <div style={{ padding: '2rem' }}>
        {/* 헤더 영역 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>🛒 이커머스 메인 페이지</h1>
          <div>
            <button
                style={{ marginRight: '10px', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }}
                onClick={() => navigate('/login')}
            >
              로그인
            </button>
            <button
                style={{ padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }}
                onClick={() => navigate('/signup')}
            >
              회원가입
            </button>
          </div>
        </div>

        {/* 상품 목록 영역 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginTop: '2rem' }}>
          {products.map((product) => (
              <div
                  key={product.seq}
                  style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '10px' }}
              >
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p><strong>{product.price.toLocaleString()}원</strong></p>
                <button onClick={() => goToDetail(product.seq)} style={{ marginRight: '10px' }}>
                  상세보기
                </button>
                <button onClick={() => addToCart(product.seq)}>장바구니</button>
              </div>
          ))}
        </div>
      </div>
  );
};

export default MainPage;