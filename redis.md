# redis là gì
=> là cơ sở dữ liệu lưu trên bộ nhớ
# tại sao sử dụng redi
# -------hiệu xuất cao và đồng thời cao-------

++ Hiệu xuất cao : Người dùng truy cập vào cơ sở dữ liệu lần đầu tiên  . dữ liệu dc lấy từ ổ cứng , sao đó lưu vào bộ đệm dữ liệu (cache) các lần sau sẽ nhanh hơn.

++ Tính đồng thời : Là yêu cầu các hoạt động trực tiếp các yêu cầu có thể có thể chịu đựng được lớn hơn nhiều so với truy cập trực tiếp tại csdl vì vậy chúng ta có thể xem  sét chuyển một phần dữ liệu cơ sở dữ liệu sang bộ đệm để một phần yêu cầu của người dùng đến trực tiếp bộ đệm mà ko cần qua cơ sở dữ liệu .

# redis và memcahed 
=> redis hỗ trợ nhiều kịch bản phong phú hơn 
    ++ key value , list , connection , has string ...
    ++ redis có tính hỗ trợ bền bỉ của dữ liệu  . có thể lưu trữ trên bộ nhớ hoặc ổ đĩa . tải lại sử dụng khi khởi động lại 
    ++ hỗ trợ fulter nguyên bản
    ++ redis hỗ trợ đa luồng
=> mencached hỗ trợ 1 kiểu đơn giản là string 
    ++ menchached là lưu trự tất cả dữ liệu trên bộ nhớ khi server die thì có thể mất dữ liệu
    ++ hỗ trợ đơn luồng
# redis có bao nhiêu kiểu dữ liệu 
    ++string : get ,set , mget , mset 
        -- dùng làm bộ đệm bộ đếm . số lượng block nhỏ , like thích 
    ++ hash là một bản ánh sạ giữ các trường và các kiễu chuỗi .Đặc biệt lưu trự các đối tượng trong các thao tác tiếp theo .Có thể sửa đổi giá trị trực tiếp trên một trường nhất định 
        -- lưu thông tin sản phẩm , thông tin người dùng 
    ++ list tập hợp liên kết . quan trong nhất trong redis 
        --- danh sách follow fb , message
    ++ set là danh sách hàm đặc biệt . có thể tự động sấp sếp các bản sao .
        function là tìm điểm chung của các user .sợ thích chung của followed . tim giao điểm 
    ++ bộ sấp xếp 
#