import { Tag } from "antd";
import React from "react";
import { motion } from "framer-motion";

export default function ({ shuffle, search, newest, filterByCategory }) {
  const categories = ["sci-fi", "anime", "movies", "animals"];

  return (
    <div className="header py-1 flex justify-center bg-slate-600">
      <div className="flex gap-2">
        <motion.div
          className="box"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <button className="btn btn-primary btn-xs m-x1" onClick={shuffle}>
            Shuffle
          </button>
        </motion.div>
        <motion.div
          className="box"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <button className="btn btn-secondary btn-xs mx-1" onClick={newest}>
            Newest
          </button>
        </motion.div>
      </div>
      <div className="flex gap-2">
        <p className="text-white"> Categories :</p>
        <motion.div
          className="box"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Tag
            onClick={() => filterByCategory("all")}
            className="hover:cursor-pointer "
            color="geekblue"
          >
            all
          </Tag>
        </motion.div>
        {categories.map((cat) => (
          <motion.div
            className="box"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            key={cat}
          >
            <Tag
              onClick={() => filterByCategory(cat)}
              value={cat}
              className="hover:cursor-pointer "
              color="geekblue"
            >
              {cat}
            </Tag>
          </motion.div>
        ))}
      </div>
      <input
        style={{ marginLeft: 15, minWidth: 130, maxWidth: 300 }}
        type="text"
        placeholder="input search text"
        className="input input-bordered input-xs w-full max-w-xs"
        onChange={search}
      />
    </div>
  );
}
