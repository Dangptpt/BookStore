from fastapi import HTTPException, status

UNAUTHORIZED = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
)

BAD_REQUEST = HTTPException(
    status_code=status.HTTP_400_BAD_REQUEST,
    detail="Something went wrong",
)

NOT_FOUND = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail="Email not found",
)

CONFLICT = HTTPException(
    status_code=status.HTTP_409_CONFLICT,
    detail="User already exists",
)

FORBIDDEN = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN,
    detail="You don't have permission to access this resource",
)
